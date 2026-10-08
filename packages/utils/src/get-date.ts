export const getDate = (date: string | null) => {
  const year = date ? new Date(date).getFullYear() : null

  return {
    year
  }
}
