import seedrandom from 'seedrandom'
import { RANDOM_SEED } from '../logic/constants'

export function seedShuffle<T>(array: T[], seed = RANDOM_SEED): T[] {
  const rng = seedrandom(seed)
  let currentIndex = array.length
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(rng() * currentIndex)
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array
}
