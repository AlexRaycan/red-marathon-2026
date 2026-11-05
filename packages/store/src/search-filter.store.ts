import type { GenreSlug } from '@app/api'
import { create } from 'zustand'

interface ISearchFilters {
  genres: GenreSlug[]
  yearFrom: number | null
  yearTo: number | null
}

interface ISearchFilterState extends ISearchFilters {
  toggleGenre: (genre: GenreSlug) => void
  setYearFrom: (year: number | null) => void
  setYearTo: (year: number | null) => void
  resetFilters: () => void
}

const INITIAL_FILTERS: ISearchFilters = {
  genres: [],
  yearFrom: null,
  yearTo: null
}

export const useSearchFilterStore = create<ISearchFilterState>(set => ({
  ...INITIAL_FILTERS,
  toggleGenre: genre =>
    set(({ genres }) => ({
      genres: genres.includes(genre)
        ? genres.filter(item => item !== genre)
        : [...genres, genre]
    })),
  setYearFrom: yearFrom => set({ yearFrom }),
  setYearTo: yearTo => set({ yearTo }),
  resetFilters: () => set(INITIAL_FILTERS)
}))
