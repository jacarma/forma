import React, { useCallback } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { InputProps, EffectiveInputProps } from '../FormaComponent'
import { useEffectiveInputProps } from '../useEffectiveProps'

export function Text(rawProps: InputProps) {
  const props = useEffectiveInputProps<string>(rawProps)

  return <ResolvedText {...props} />
}

export function ResolvedText({
  label,
  value,
  description,
  enabled,
  visible,
  setValue,
  errors,
  className,
  firstError
}: EffectiveInputProps<string> & TextFieldProps) {
  const onChange = useCallback(
    (event) => setValue(event.currentTarget.value),
    [setValue]
  )
  const helper = firstError ?? description

  if (!visible) return null

  return (
    <TextField
      classes={{ root: className }}
      label={label}
      value={value || ''}
      onChange={onChange}
      sx={{ m: 1 }}
      error={!!errors?.length}
      helperText={helper}
      disabled={!enabled}
    />
  )
}
