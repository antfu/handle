import { describe, expect, it } from 'vitest'
import { toSimplified, toTraditional } from '../src/convert'

describe('covert', () => {
  it('toSimplified', () => {
    expect(toSimplified('輸入繁體字進行轉換')).toMatchInlineSnapshot('"输入繁体字进行转换"')
  })

  it('toTraditional', () => {
    expect(toTraditional('输入简体字进行转换')).toMatchInlineSnapshot('"輸入簡體字進行轉換"')
  })
})
