import { describe, expect, it } from 'vitest'
import { getPinyin, pinyinToToneStyle } from '../src/pinyin'

describe('pinyin', () => {
  it('getPinyin', () => {
    expect(getPinyin('輸入繁體字進行轉換').map(pinyinToToneStyle).join(' '))
      .toMatchInlineSnapshot('"shū rù fán tī zì jìn háng zhuǎn huàn"')
  })
})
