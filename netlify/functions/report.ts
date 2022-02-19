import type { Handler } from '@netlify/functions'
import LRU from 'lru-cache'
import { supabase } from '../supabase'
import type { Report } from '../../shared'

const cache = new LRU<number, Report>({
  max: 100,
  maxAge: 1000 * 60 * 15, // 15 minutes
})
const START_DATE = new Date(2022, 0, 0)
const dayNo = Math.floor((Date.now() - +START_DATE) / 86400000)

export const handler: Handler = async(event) => {
  const day = +(new URLSearchParams(event.rawQuery).get('d') || dayNo)
  let payload: Report

  if (!cache.has(day)) {
    const { data = [], error } = await supabase
      .from('uploads')
      .select('triesCount, passed, failed, hint, duration')
      .match({ day })

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error }),
      }
    }

    const items = data!.filter(i => i.triesCount && (i.passed || i.failed))
    const passed = items.filter(i => i.passed)
    const count = items.length

    payload = {
      day,
      count,
      averageTries: passed.map(i => i.triesCount).reduce((a, b) => a + b, 0) / (passed.length || 1),
      passRate: passed.length / (count || 1),
      hintRate: passed.filter(i => i.hint).length / (passed.length || 1),
      lastUpdate: Date.now(),
    }
    cache.set(day, payload)
  }
  else {
    payload = cache.get(day)!
  }

  return {
    statusCode: 200,
    body: JSON.stringify(payload),
  }
}
