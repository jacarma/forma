import { JsonObject, JsonValue } from 'type-fest'

export type ValidationsType = Array<
  (value: JsonValue, props: ComponentProps) => boolean
>
export type Computation<T> = (context: JsonObject) => T

export type ComputableProp<T> = T | Computation<T>

export type ComponentProps = {
  label?: ComputableProp<string>
  enabled?: ComputableProp<boolean>
  visible?: ComputableProp<boolean>
  description?: ComputableProp<string>
  validations?: ComputableProp<ValidationsType>
  children?: JSX.Element | JSX.Element[]
}

export type InputProps = ComponentProps & {
  model: string
}

export type EffectiveComponentProps = {
  label?: string
  enabled?: boolean
  visible?: boolean
  description?: string
  validations?: ValidationsType
  children?: JSX.Element | JSX.Element[]
}

export type EffectiveInputProps<T> = EffectiveComponentProps & {
  value: T
  setValue: (value: T) => void
  errors: Array<string>
}
