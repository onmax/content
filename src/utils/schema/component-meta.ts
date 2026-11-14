import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import type { getComponentMeta as GetComponentMeta } from 'nuxt-component-meta/parser'

let parser: { getComponentMeta: typeof GetComponentMeta } | undefined

/**
 * `nuxt-component-meta/parser` loads the TypeScript compiler, so it is loaded on first use, by schemas
 * that inherit component props. It is required synchronously because `defineCollection` is synchronous.
 */
export const getComponentMeta: typeof GetComponentMeta = (...args) => {
  parser ||= createRequire(import.meta.url)(fileURLToPath(import.meta.resolve('nuxt-component-meta/parser')))
  return parser!.getComponentMeta(...args)
}
