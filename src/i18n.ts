import hans from './locales/zh-cn.json'
import hant from './locales/zh-tw.json'

const lang = window.navigator.language?.toLowerCase() || ''
export const preferTraditional = lang.includes('hant') || lang.includes('tw') || lang.includes('hk')
export const preferZhuyin = lang.includes('tw')

export const locale = useStorage<'hans' | 'hant'>('handle-locale', preferTraditional ? 'hant' : 'hans')

export function t(key: keyof typeof hans, ...t: any[]): string {
  const str: string = (locale.value === 'hant' ? (hant as any)[key] : null) || hans[key]
  return str.replace(/\{(\d+)\}/g, (_, i) => t[i])
}
