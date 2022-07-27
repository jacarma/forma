import React from 'react'
import { JsonObject } from 'type-fest'
import { FormaContext, useNewFormaContext } from './FormaContext'

export type FormProps = {
  initialContext: JsonObject
  children: React.ReactNode
  onChange?: (value: JsonObject, isValid: boolean) => void
  onValidChange?: (isVaid: boolean) => void
}

export function Forma({
  initialContext,
  children,
  onChange,
  onValidChange
}: FormProps) {
  const ctx = useNewFormaContext(initialContext, onChange, onValidChange)

  return (
    <form noValidate autoComplete='off'>
      <FormaContext.Provider value={ctx}>{children}</FormaContext.Provider>
    </form>
  )
}
