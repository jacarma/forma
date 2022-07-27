import React, { useCallback } from 'react'
import TextField from '@mui/material/TextField'
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
  errors
}: EffectiveInputProps<string>) {
  const onChange = useCallback(
    (event) => setValue(event.currentTarget.value),
    [setValue]
  )
  const helper = errors.length ? errors[0] : description

  if (!visible) return null

  return (
    <TextField
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
