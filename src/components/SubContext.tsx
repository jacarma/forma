import React, { ReactNode } from 'react'
import { FormaContext, useFormaSubContext } from '../FormaContext'

export type SubContextProps = {
  model: string
  children: ReactNode
}
export function SubContext({ model, children }: SubContextProps) {
  const ctx = useFormaSubContext(model)

  return (
    <div>
      <FormaContext.Provider value={ctx}>{children}</FormaContext.Provider>
    </div>
  )
}
