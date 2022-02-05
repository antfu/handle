import fs from 'fs/promises'
// import pinyin from 'pinyin'
import data from './src/data/idioms.json'

// const n = data.map((i) => {
//   const p = pinyin(i.word, { style: pinyin.STYLE_TONE2 }).map(i => i[0]).join(' ')
//   if (p === i.pinyin)
//     return [i.word]
//   return [i.word, i.pinyin]
// })

fs.writeFile('./src/data/idioms.json', `[\n${data.map(i => JSON.stringify(i)).join(',\n')}\n]`, 'utf8')
