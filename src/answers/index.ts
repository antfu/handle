import seedrandom from 'seedrandom'
import { getHint } from '../logic'
import { answers } from './list'

export function getAnswerOfDay(day: number) {
  let answer: string[]
  // When the day is out of range, pick a random answer from the list.
  if (day > answers.length) {
    const seed = seedrandom('day-' + day)()
    answer = answers[Math.floor(seed * answers.length)]
  }
  else {
    answer = answers[day]
  }
  const [word = '', hint = ''] = answer
  return {
    word,
    hint: hint || getHint(word),
  }
}
