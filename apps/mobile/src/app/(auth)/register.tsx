import { AuthForm } from '@/components/screens/auth'

import { useSigning } from '@/hooks'

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
