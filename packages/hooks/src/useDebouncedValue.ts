import { useEffect, useState } from 'react'

const DEFAULT_DELAY_MS = 400

export function useDebouncedValue<T>(value: T, delay = DEFAULT_DELAY_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
