import { expect, it } from 'vitest'
import { getPinyin } from '../src/logic'

it('getPinyin', () => {
  expect(getPinyin('自怨自艾')).toMatchInlineSnapshot()
})
