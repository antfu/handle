export function reverseMap<K extends string | number, V extends string | number>(dict: Record<K, V>): Record<V, K> {
  const result: Record<any, any> = {}
  for (const [key, value] of Object.entries(dict) as any[])
    result[value] = key
  return result
}
