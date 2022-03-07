// @ts-expect-error missing types
import _getPinyinWeb from 'pinyin/lib/web-pinyin.js'
import { parsePinyin } from './parse'

const _getPinyin = _getPinyinWeb as typeof import('pinyin')

export function getPinyin(text: string) {
  return _getPinyin(text, { style: _getPinyin.STYLE_TONE2 }).map(i => parsePinyin(i[0]))
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('pinyin', () => {
    it('getPinyin', () => {
      expect(getPinyin('輸入繁體字進行轉換').map(i => i.base + i.tone).join(' '))
        .toMatchInlineSnapshot('"shu1 ru4 fan2 ti1 zi4 jin4 hang2 zhuan3 huan4"')
    })
  })
}
