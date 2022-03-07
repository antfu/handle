import toSimplifiedMap from './map/toSimplified.json'
import { reverseMap } from './utils'

export function toSimplified<T extends string | number | undefined>(text: T): T {
  if (!text || typeof text !== 'string')
    return text
  // @ts-expect-error ignore
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\xFF]/g, s => ((s in toSimplifiedMap) ? toSimplifiedMap[s] : s))
}

let toTraditionalMap: Record<string, string> | undefined

export function toTraditional<T extends string | number | undefined>(text: T): T {
  if (!text || typeof text !== 'string')
    return text
  if (!toTraditionalMap)
    toTraditionalMap = reverseMap(toSimplifiedMap)
  // @ts-expect-error ignore
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\xFF]/g, s => ((s in toTraditionalMap) ? toTraditionalMap[s] : s))
}
