import React, { useCallback } from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { InputProps, ComponentProps } from '../FormaComponent'
import { useEffectiveInputProps, useEffectiveProps } from '../useEffectiveProps'
import {
  FormControlLabel,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio
} from '@mui/material'
import { JsonValue } from 'type-fest'

export function RadioGroup(rawProps: InputProps) {
  const {
    label,
    value,
    description,
    // enabled,
    visible,
    setValue,
    errors,
    children
  } = useEffectiveInputProps<JsonValue>(rawProps)
  const onChange = useCallback(
    (event) => setValue(event.currentTarget.value),
    [setValue]
  )
  const helper = errors.length ? errors[0] : description

  if (!visible) return null

  return (
    <FormControl error={!!errors?.length} style={{ margin: '8px' }}>
      <FormLabel>{label || ''}</FormLabel>
      <MuiRadioGroup value={value || ''} name={label} onChange={onChange}>
        {children}
      </MuiRadioGroup>
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  )
}

export type RadioProps = ComponentProps & { value: JsonValue }

export function Radio({ value, ...rawProps }: RadioProps) {
  const { label } = useEffectiveProps(rawProps)
  return (
    <FormControlLabel
      value={value}
      control={<MuiRadio />}
      label={label || '' + value || ''}
    />
  )
}
