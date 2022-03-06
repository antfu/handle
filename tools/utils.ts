const symbolMap: Record<string, string> = {
  'ā': 'a1',
  'á': 'a2',
  'ǎ': 'a3',
  'à': 'a4',
  'ē': 'e1',
  'é': 'e2',
  'ě': 'e3',
  'è': 'e4',
  'ō': 'o1',
  'ó': 'o2',
  'ǒ': 'o3',
  'ò': 'o4',
  'ī': 'i1',
  'í': 'i2',
  'ǐ': 'i3',
  'ì': 'i4',
  'ū': 'u1',
  'ú': 'u2',
  'ǔ': 'u3',
  'ù': 'u4',
  'ü': 'v0',
  'ǘ': 'v2',
  'ǚ': 'v3',
  'ǜ': 'v4',
  'ń': 'n2',
  'ň': 'n3',
  '': 'm2',
}

export function normalizePinyin(pinyin: string) {
  return pinyin.split(/\s+/g).map((i) => {
    let tone = ''
    const body = Array.from(i).map((c) => {
      if (symbolMap[c]) {
        tone = symbolMap[c][1]
        return symbolMap[c][0]
      }
      return c
    }).join('')
    return body + tone
  }).join(' ')
}
