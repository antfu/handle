import { nanoid } from 'nanoid'
import { createClient } from '@supabase/supabase-js'
import { dayNo } from './state'
import { history, inputMode } from './storage'
import type { TriesMeta } from './logic'

const SUPABASE_URL = 'https://lxmqadkqgpcewmfffyig.supabase.co'
const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bXFhZGtxZ3BjZXdtZmZmeWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyNjI3NzUsImV4cCI6MTk2MDgzODc3NX0.2b1IvYNjFBCQ5wsHbkt1xBoupaaXgWL9VgVfHCQtcNQ'

// Lazy initialize the client
let _supabase: ReturnType<typeof createClient> | undefined

// TODO:
let _uid = localStorage.getItem('handle-uid')!
if (!_uid) {
  _uid = nanoid()
  localStorage.setItem('handle-uid', _uid)
}

export async function getSupabase() {
  if (!_supabase)
    _supabase = _supabase || createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)
  return _supabase
}

export const analyticSetting = useStorage<number>('handle-accept-analytics', 0) // 0: not sure, 1: ok, -1: no

export function preparePayload(day: number, meta: TriesMeta) {
  if (!meta || (!meta.passed && !meta.failed) || meta.sent)
    return

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sent, ...rest } = toRaw(meta)
  const payload = {
    id: `${_uid}-${day}`,
    uid: _uid,
    day,
    inputMode: inputMode.value,
    ...rest,
  }

  return payload
}

export async function sendAnalytics(day = dayNo.value) {
  if (analyticSetting.value < 0)
    return

  const meta = history.value[day]

  uploadPayloads([preparePayload(day, meta)])
}

export async function uploadPayloads(payloads: ReturnType<typeof preparePayload>[]) {
  const items = payloads.filter(<T>(i: T | undefined): i is T => !!i)
  if (!items.length)
    return

  const s = await getSupabase()
  const { data, error } = await s.from('uploads').insert(items)

  // mark as sent
  // if (!error) {
  //   items.forEach((i) => {
  //     if (history.value[i.day])
  //       history.value[i.day].sent = true
  //   })
  // }

  console.log({ data, error })
}

export async function sendHistoryAnalytics() {
  if (analyticSetting.value < 0)
    return

  const payloads = Object.entries(history.value)
    .map(([day, meta]) => preparePayload(Number(day), meta))

  await uploadPayloads(payloads)
}
