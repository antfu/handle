import { finals as finalsMap } from '../map/toShuangpin.json'

export const shuangpinInitials = 'b p m f d t n l g k h j q r x w y u i v z c s o'.split(' ').sort()
export const shuangpinFinals = Array.from(new Set(Object.values(finalsMap))).sort()
