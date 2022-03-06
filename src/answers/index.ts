import { getHint } from '../logic'
import { answers } from './list'

export function getAnswerOfDay(day: number) {
  const [word = '', hint = ''] = answers[day] || []
  return {
    word,
    hint: hint || getHint(word),
  }
}
