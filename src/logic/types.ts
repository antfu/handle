export type MatchType = 'exact' | 'misplaced' | 'none'

export interface ParsedChar {
  char: string
  one: string
  two?: string
  three?: string
  tone: number
}

export interface MatchResult {
  char: MatchType
  one: MatchType
  two: MatchType
  three: MatchType
  tone: MatchType
}

export interface TriesMeta {
  hint?: boolean
  answer?: boolean
  start?: number
  end?: number
  failed?: boolean
  passed?: boolean
  tries?: string[]
}
