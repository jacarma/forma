import { useContext, useMemo } from 'react'
import {
  ComponentProps,
  InputProps,
  EffectiveComponentProps,
  EffectiveInputProps
} from './FormaComponent'
import { FormaContext } from './FormaContext'
import { getFirstErrorText } from './utils'

export function useEffectiveInputProps<T>({
  model,
  ...rest
}: InputProps): EffectiveInputProps<T> {
  const { setModel, getModel, setValid, translations } =
    useContext(FormaContext)
  const props = useEffectiveProps(rest) as EffectiveInputProps<T>
  const fieldId = useMemo(() => generateId(), [])
  props.value = getModel(model) as T
  props.setValue = (value: T) => setModel(model, value)

  const errors = (props.validations
    ?.map((validation) =>
      validation(props.value, props) ? undefined : validation.name
    )
    .filter(Boolean) || []) as Array<string>

  setValid(fieldId, errors.length == 0)
  const firstError = getFirstErrorText(errors, translations)

  return { ...props, errors, firstError }
}

export function useEffectiveProps({
  label,
  enabled,
  visible,
  description,
  validations,
  className,
  ...props
}: ComponentProps) {
  const { evaluate } = useContext(FormaContext)
  return {
    ...props,
    label: evaluate(label),
    enabled: evaluate(enabled) ?? true,
    description: evaluate(description),
    visible: evaluate(visible) ?? true,
    validations: evaluate(validations),
    className: evaluate(className)
  } as EffectiveComponentProps
}

let lastId = 0
const generateId = () => `${lastId++}`
