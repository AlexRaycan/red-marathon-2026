export const MIN_YEAR = 1950
export const CURRENT_YEAR = new Date().getFullYear()

export const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, i) => MIN_YEAR + i
)
