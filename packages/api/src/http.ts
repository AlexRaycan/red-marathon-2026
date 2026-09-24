let getToken: () => Promise<string | null> = async () => null
let baseUrl = ''

export const configureApi = (options: {
  baseUrl: string
  getToken: () => Promise<string | null>
}) => {
  baseUrl = options.baseUrl
  getToken = options.getToken
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public messages: string[]
  ) {
    super(messages[0])
  }
}

export const http = async <T>(url: string, init?: RequestInit): Promise<T> => {
  if (!baseUrl) {
    throw new Error('API is not configured. Please call configureApi() first.')
  }

  const token = await getToken()

  const response = await fetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      ApiError | undefined

    const raw = body?.message ?? response.statusText
    throw new ApiError(response.status, Array.isArray(raw) ? raw : [raw])
  }

  const data =
    response.status === 204 ? undefined : ((await response.json()) as T)

  return { data, status: response.status, headers: response.headers } as T
}
