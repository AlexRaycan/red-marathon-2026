export function getJoinedArray(array: unknown[]) {
  return array.filter(Boolean).join(' • ')
}
