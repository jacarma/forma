import React, { useCallback, useContext, useState } from 'react'
import { JsonValue, Jsonify, JsonObject } from 'type-fest'

export type FormaContextType = {
  setModel: (model: string, value: JsonValue) => void
  getModel: (model: string) => JsonValue | undefined
  evaluate: <T>(
    exp: T | undefined | ((context: JsonObject) => T)
  ) => T | undefined
  contextPath: Array<string>
  context: JsonObject
  setValid: (path: string, isValid: boolean) => void
}

export const FormaContext = React.createContext({
  setModel: () => undefined,
  getModel: () => null,
  evaluate: () => null,
  contextPath: [],
  context: {},
  setValid: () => undefined
} as FormaContextType)

export function useNewFormaContext(
  initialModel?: JsonObject,
  onChange?: (value: JsonObject, isValid: boolean) => void,
  onValidChange?: (isValid: boolean) => void
) {
  const [context, setContext] = useState<JsonObject>(initialModel || {})
  const contextPath: Array<string> = []

  const setModel = useCallback(
    (model: string, value: JsonValue) => {
      const newContext = { ...context, [model]: value } as Jsonify<any>
      setContext(newContext)
      onChange?.(newContext, true)
    },
    [setContext, context]
  )

  const getModel = useCallback((model: string) => context[model], [context])

  const evaluate = useCallback(
    (expression: any) => {
      if (expression instanceof Function) return expression(context)
      return expression
    },
    [context]
  )

  const formValidations = {}
  let formWasValid: boolean | null = null

  const updateIsValid = debounce(() => {
    const nowFormIsValid =
      Object.values(formValidations).find((value) => value !== true) ===
      undefined
    if (nowFormIsValid !== formWasValid) {
      formWasValid = nowFormIsValid
      onValidChange?.(nowFormIsValid)
    }
  }, 10)

  const setValid = (componentPath: string, componentIsValid: boolean) => {
    if (formValidations[componentPath] === componentIsValid) return
    formValidations[componentPath] = componentIsValid
    if (formWasValid !== componentIsValid) updateIsValid()
  }

  return { context, contextPath, getModel, setModel, evaluate, setValid }
}

export function useFormaSubContext(parentModel: string) {
  const {
    contextPath: parentContextPath,
    context: parentContext,
    setModel: parentSetModel,
    setValid
  } = useContext(FormaContext)
  const contextPath = [...parentContextPath, parentModel]
  const context = (parentContext[parentModel] as JsonObject) || {}

  const setModel = useCallback(
    (model: string, value: JsonValue) => {
      parentSetModel(parentModel, {
        ...context,
        [model]: value
      } as Jsonify<any>)
    },
    [parentSetModel, context]
  )

  const getModel = useCallback((model: string) => context[model], [context])

  const evaluate = useCallback(
    (expression: any) => {
      if (expression instanceof Function) return expression(context)
      return expression
    },
    [context]
  )

  return { context, contextPath, getModel, setModel, evaluate, setValid }
}

function debounce(f: () => void, interval: number) {
  let timer: NodeJS.Timeout | null = null

  return () => {
    if (timer) clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(f()), interval)
    })
  }
}
