import type { AUTH_CONTENT } from '@app/constants'

import { AuthForm } from '@/components/pages/auth'

import { useSigning } from '@/hooks/useSigning'

const TYPE: keyof typeof AUTH_CONTENT = 'login'

export default function Login() {
  const { mutate, isPending, error } = useSigning(TYPE)

  return (
    <AuthForm
      type={TYPE}
      error={error}
      isPending={isPending}
      onSubmit={data => mutate({ data })}
    />
  )
}
