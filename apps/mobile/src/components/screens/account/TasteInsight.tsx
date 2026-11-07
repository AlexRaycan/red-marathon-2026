import { useMyTasteInsight } from '@app/api'

import { AiTextCard } from '@/components/elements'

export function TasteInsight() {
  const { data, isPending, isError } = useMyTasteInsight({
    query: { staleTime: Infinity }
  })

  const insight = data?.status === 200 ? data.data.insight : null

  if (isError || (!isPending && !insight)) return null

  return (
    <AiTextCard
      title='Taste DNA'
      text={insight}
      isLoading={isPending}
    />
  )
}
