import { JsonValue } from 'type-fest'

export function required(value: JsonValue) {
  return !!value || value === 0
}

const NUMBER = /^-?\d+(\.\d+)?(e-?\d+)?$/
export function number(value: JsonValue) {
  if (!value) return true
  if (typeof value === 'number') return true
  if (typeof value === 'string') return NUMBER.test(value)
  return false
}

const INT = /^-?\d+$/
export function int(value: JsonValue) {
  if (!value) return true
  if (typeof value === 'number') return Math.floor(value) === value
  if (typeof value === 'string') return INT.test(value)
  return false
}
