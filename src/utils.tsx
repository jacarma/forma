import { JsonObject } from 'type-fest'

export function getFirstErrorText(
  errors: Array<string>,
  translations: JsonObject
) {
  return (
    translations?.validations?.[errors?.[0]] ??
    defaultTranslations?.validations?.[errors?.[0]] ??
    errors?.[0]
  )
}

const defaultTranslations = {
  validations: {
    required: 'This field is required',
    int: 'This field must be an integer'
  }
}
