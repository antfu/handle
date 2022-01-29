import data from './data/data.json'

const len = data.length

const a = Array.from({ length: 100 }, () => data[Math.round(len * Math.random())].word)
  .map(w => `['${w}'],`)
  .join('\n')

// eslint-disable-next-line no-console
console.log(a)
