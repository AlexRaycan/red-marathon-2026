export const getDate = (date: string | null) => {
  const parsedDate = date ? new Date(date) : null

  const year = parsedDate ? parsedDate.getFullYear() : null

  const reviewDate = parsedDate
    ? parsedDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : null

  return {
    year,
    reviewDate
  }
}
