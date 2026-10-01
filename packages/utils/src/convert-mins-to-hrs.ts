export function convertMinsToHrs(mins: number): {
  hours: number
  minutes: number
} {
  const hours = Math.floor(mins / 60)
  const minutes = mins % 60

  return {
    hours,
    minutes
  }
}
