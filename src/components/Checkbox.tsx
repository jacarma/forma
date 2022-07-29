import React, { useCallback } from 'react'
import CheckboxField from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import { InputProps } from '../FormaComponent'
import { useEffectiveInputProps } from '../useEffectiveProps'

export function Checkbox(rawProps: InputProps) {
  const {
    label,
    value,
    description,
    enabled,
    visible,
    setValue,
    errors,
    firstError
  } = useEffectiveInputProps<boolean>(rawProps)
  const onChange = useCallback(
    (event) => setValue(event.currentTarget.checked),
    [setValue]
  )
  const helper = firstError ?? description
  if (!visible) return null

  return (
    <FormControl error={!!errors?.length}>
      <FormControlLabel
        control={
          <CheckboxField
            checked={value || false}
            onChange={onChange}
            sx={{ m: 1 }}
            disabled={!enabled}
          />
        }
        label={label || ''}
      />
      {helper && <FormHelperText>{helper}</FormHelperText>}
    </FormControl>
  )
}
