export function toFixed(number: number, count?: number): number {
  return typeof number === 'number' ? Number(number.toFixed(count ?? 2)) : 0
}
