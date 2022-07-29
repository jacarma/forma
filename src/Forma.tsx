import React, { CSSProperties } from 'react'
import { JsonObject } from 'type-fest'
import { FormaContext, useNewFormaContext } from './FormaContext'

export type FormProps = {
  initialContext: JsonObject
  children: React.ReactNode
  onChange?: (value: JsonObject, isValid: boolean) => void
  onValidChange?: (isVaid: boolean) => void
  columns?: number
}

export function Forma({
  initialContext,
  children,
  onChange,
  onValidChange,
  columns
}: FormProps) {
  const ctx = useNewFormaContext(initialContext, onChange, onValidChange)
  const ncols = columns || 1
  const style = {
    ['--forma-columns' as any]: ncols,
    display: 'grid',
    gridTemplateColumns: `repeat(${ncols}, 1fr )`,
    gridGap: '10px'
  } as CSSProperties
  return (
    <form noValidate autoComplete='off'>
      <FormaContext.Provider value={ctx}>
        <div style={style}>{children}</div>
      </FormaContext.Provider>
    </form>
  )
}
