import { type DiscoverItemResponse, useAiRecommendations } from '@app/api'

import { useAuth } from './useAuth'

const STALE_TIME = 60 * 60 * 1000 // 1h

export function useAiTopPicks(fallback: DiscoverItemResponse[]) {
  const { isAuthenticated } = useAuth()

  const { data } = useAiRecommendations({
    query: { enabled: isAuthenticated, staleTime: STALE_TIME }
  })

  const picks =
    data?.status === 200 ? data.data.items.map(item => item.item) : []

  return { picks: picks.length > 0 ? picks : fallback }
}
