import sougouMap from '../map/shuangpin/sougou.json'
import xiaoheMap from '../map/shuangpin/xiaohe.json'
export type SpMode = 'sougou' | 'xiaohe'

const shuangpinInitials = 'b p m f d t n l g k h j q r x w y u i v z c s o'.split(' ').sort()
function convertFinalMap(map: Record<string, string>) {
  return Array.from(new Set(Object.values(map))).sort()
}

const shuangpinConstants: Record<SpMode, { initials: string[]; finals: string[] }> = {
  sougou: {
    initials: shuangpinInitials,
    finals: convertFinalMap(sougouMap.finals),
  },
  xiaohe: {
    initials: shuangpinInitials,
    finals: convertFinalMap(xiaoheMap.finals),
  },
}

export function getShuangpinMaps(spMode: SpMode): { initials: Record<string, string>; finals: Record<string, string> } {
  return {
    sougou: sougouMap,
    xiaohe: xiaoheMap,
  }[spMode] ?? sougouMap
}

export function getShuangpinConstants(spMode: SpMode) {
  return shuangpinConstants[spMode] ?? shuangpinConstants.sougou
}
