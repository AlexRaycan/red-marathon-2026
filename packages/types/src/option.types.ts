export interface IOption<T extends string> {
  value: T | null
  label: string
  count?: number
  isFilledIcon?: boolean
}
