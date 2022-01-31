import { expect, it } from 'vitest'
import { parseWord } from '../src/logic/utils'

it('parseWord', () => {
  expect(parseWord('虎虎生威')).toMatchInlineSnapshot()
})
