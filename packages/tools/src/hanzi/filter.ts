export function filterNonChineseChars(input: string) {
  return Array.from(input)
    .filter(i => /\p{Unified_Ideograph}/u.test(i))
    .join('')
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('filterNonChineseChars', () => {
    expect(filterNonChineseChars('Hello World!')).toBe('')
    expect(filterNonChineseChars('こんにちは')).toBe('')
    expect(filterNonChineseChars('안녕하세요')).toBe('')
    expect(filterNonChineseChars('你好啊')).toMatchInlineSnapshot('"你好啊"')
    expect(filterNonChineseChars('Hello，你好!')).toMatchInlineSnapshot('"你好"')
  })
}
