import { fetch } from 'ohmyfetch'
import { load } from 'cheerio'

export async function getWordInfoFromZDict(word: string) {
  const r = await fetch(`https://www.zdic.net/hans/${word}`)
  const html = await r.text()

  const $ = load(html)
  const pinyin = $('.dicpy').first().text()
  const explain = $('.gc_sy').text()

  if (!pinyin)
    return

  return {
    word,
    pinyin,
    explain,
  }
}
