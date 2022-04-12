import { TRIES_LIMIT } from './constants'
import { history } from '~/storage'
import { getAnswerOfDay } from '~/answers'

export function tryFixAnswer(day: number) {
  const meta = history.value[day]
  const answer = getAnswerOfDay(day)
  if (!meta)
    return
  if (!meta.answer && !meta.failed && !meta.passed)
    return

  const tries = meta.tries || []
  const index = tries.indexOf(answer.word)
  if (index < 0 || index >= tries.length - 1)
    return

  const newTries = tries.slice(0, index + 1)
  meta.tries = newTries
  if (index <= TRIES_LIMIT) {
    meta.passed = true
    meta.failed = false
  }
  meta.duration = (meta.duration || 0) * newTries.length / tries.length
}
