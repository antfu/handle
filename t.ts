import data from './src/data/idioms.json'

const len = data.length

const a = Array.from({ length: 100 }, () => data[Math.round(len * Math.random())][0])
  .map(w => `['${w}'],`)
  .join('\n')

// eslint-disable-next-line no-console
console.log(a)
