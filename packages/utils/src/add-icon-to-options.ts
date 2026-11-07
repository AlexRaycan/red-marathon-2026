import type { IOption } from '@app/types'

export function addIconToOptions<T extends string, I, V>(
  object: IOption<T>,
  icons: Record<NonNullable<IOption<T>['value']>, I>,
  fallbackIcon: V
) {
  return {
    ...object,
    icon: object.value === null ? fallbackIcon : icons[object.value]
  }
}
