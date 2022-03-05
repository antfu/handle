import map from '../../data/t2s.json'

export function toSimplified<T extends string | number | undefined>(text: T): T {
  if (!text || typeof text === 'number')
    return text
  // @ts-expect-error ignore
  // eslint-disable-next-line no-control-regex
  return text.replace(/[^\x00-\xFF]/g, s => ((s in map) ? map[s] : s))
}
