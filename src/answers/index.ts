import { getHint } from '../logic'
import { idioms } from './list'

export function getAnswerOfDay(day: number) {
  day %= idioms.length
  const word = idioms[day] || ''
  const hint = idioms[day][day%4] || ''
  return {
    word,
    hint: hint || getHint(word),
  }
}
