import type { FieldHook } from 'payload'

const format = (val: string): string =>
  val
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

export const formatSlug =
  (fallbackField: string): FieldHook =>
  ({ value, siblingData }) => {
    if (value) {
      return format(value as string)
    }
    const fallback = siblingData?.[fallbackField]
    if (fallback && typeof fallback === 'string') {
      return format(fallback)
    }
    return value
  }
