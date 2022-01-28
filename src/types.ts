
export type MatchType = 'exact' | 'misplaced' | 'none'

export interface ParsedChar {
  char: string
  one: string
  two: string
  three: string
  tone: number
}

export interface MatchResult {
  char: MatchType
  one: MatchType
  two: MatchType
  three: MatchType
  tone: MatchType
}
