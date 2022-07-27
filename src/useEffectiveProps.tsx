import { useContext, useMemo } from 'react'
import {
  ComponentProps,
  InputProps,
  EffectiveComponentProps,
  EffectiveInputProps
} from './FormaComponent'
import { FormaContext } from './FormaContext'

export function useEffectiveInputProps<T>({ model, ...rest }: InputProps) {
  const { setModel, getModel, setValid } = useContext(FormaContext)
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

  return { ...props, errors }
}

export function useEffectiveProps({
  label,
  enabled,
  visible,
  description,
  validations,
  children
}: ComponentProps) {
  const { evaluate } = useContext(FormaContext)
  return {
    label: evaluate(label),
    enabled: evaluate(enabled) ?? true,
    description: evaluate(description),
    visible: evaluate(visible) ?? true,
    validations: evaluate(validations),
    children: children
  } as EffectiveComponentProps
}

let lastId = 0
const generateId = () => `${lastId++}`
