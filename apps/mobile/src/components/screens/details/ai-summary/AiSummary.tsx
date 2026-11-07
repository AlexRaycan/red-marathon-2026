import { useAiTitleSummary } from '@app/api'
import { useAuth } from '@app/hooks'
import { useState } from 'react'

import { AiTextCard } from '@/components/elements'

interface AiSummaryProps {
  titleKy: string
}

export function AiSummary({ titleKy }: AiSummaryProps) {
  const { isAuthenticated } = useAuth()
  const [isHide, setIsHide] = useState(true)

  const { data, isError, isPending } = useAiTitleSummary(titleKy, {
    query: {
      enabled: isAuthenticated && !isHide,
      staleTime: Infinity
    }
  })

  const summary = data?.status === 200 ? data?.data.summary : null

  if (!isAuthenticated || isError || (!isPending && !summary)) return null

  return (
    <AiTextCard
      title='AI Summary'
      text={summary}
      isLoading={isPending}
      hidden={{ isHide, setIsHide }}
    />
  )
}
