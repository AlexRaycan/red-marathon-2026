import { loadEnvFile } from 'node:process'

try {
  loadEnvFile(new URL('../packages/api/.env', import.meta.url))

  const baseUrl = process.env.BASE_URL
  if (!baseUrl) throw new Error('BASE_URL не задан в packages/api/.env')

  const section = (process.argv[2] ?? '').trim().toLowerCase()
  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/api/docs-json`, {
    signal: AbortSignal.timeout(10_000)
  })
  if (!response.ok) {
    throw new Error(`Swagger вернул HTTP ${response.status}`)
  }

  const schema = await response.json()
  if (!schema.paths || typeof schema.paths !== 'object') {
    throw new Error('В ответе Swagger отсутствует объект paths')
  }

  for (const pathItem of Object.values(schema.paths)) {
    for (const operation of Object.values(pathItem)) {
      const operationId = operation?.operationId
      if (
        typeof operationId === 'string' &&
        (!section || operation.tags?.some(tag => tag.toLowerCase() === section))
      ) {
        console.log(operationId)
      }
    }
  }
} catch (error) {
  console.error(`Не удалось получить команды API: ${error.message}`)
  console.error(
    'Проверьте BASE_URL в packages/api/.env и доступность бэкенда (pnpm backend:dev).'
  )
  process.exitCode = 1
}
