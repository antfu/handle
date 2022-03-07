import { describe, expect, it } from 'vitest'
import { pinyinToZhuyin, zhuyinToPinyin } from '../src'
import { getPinyin, pinyinToNumberStyle } from '../src/pinyin'

describe('zhuyin', () => {
  it('toZhuyin', () => {
    expect(getPinyin('輸入繁體字進行轉換').map(i => pinyinToZhuyin(i)).join(' '))
      .toMatchInlineSnapshot('"ㄕㄨ¯ ㄖㄨˋ ㄈㄢˊ ㄊㄧ¯ ㄗˋ ㄐㄧㄣˋ ㄏㄤˊ ㄓㄨㄢˇ ㄏㄨㄢˋ"')
  })

  it('toPinyin', () => {
    expect(getPinyin('輸入繁體字進行轉換')
      .map(i => pinyinToZhuyin(i))
      .map(i => zhuyinToPinyin(i))
      .map(pinyinToNumberStyle)
      .join(' '),
    )
      .toMatchInlineSnapshot('"shu1 ru4 fan2 ti1 zi4 jin4 hang2 zhuan3 huan4"')
  })
})
