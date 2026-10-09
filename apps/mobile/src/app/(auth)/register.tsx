import { AuthForm } from '@/components/pages/auth'

import { useSigning } from '@/hooks/useSigning'

const TYPE = 'register'

export default function Register() {
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
