import React, { ReactNode } from 'react'
import { FormaContext, useFormaSubContext } from '../FormaContext'

export type SubContextProps = {
  model: string
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>
export function SubContext({ model, children, ...props }: SubContextProps) {
  const ctx = useFormaSubContext(model)

  return (
    <div {...props}>
      <FormaContext.Provider value={ctx}>{children}</FormaContext.Provider>
    </div>
  )
}
