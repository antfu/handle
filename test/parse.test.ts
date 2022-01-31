import { expect, it } from 'vitest'
import { parseChar, parseWord, testAnswer } from '../src/logic'

it('parseChar', () => {
  expect(parseChar('虎')).toMatchSnapshot()
  expect(parseChar('微')).toMatchSnapshot()
  expect(parseChar('姜')).toMatchSnapshot()
  expect(parseChar('寿')).toMatchSnapshot()
  expect(parseChar('翁')).toMatchSnapshot()
})

it('testAnswer', () => {
  expect(testAnswer(parseWord('安'), parseWord('安'))).toMatchSnapshot()
  expect(testAnswer(parseWord('帆'), parseWord('安'))).toMatchSnapshot()
})
