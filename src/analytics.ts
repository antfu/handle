import { nanoid } from 'nanoid'
import axios from 'axios'
import { dayNo } from './state'
import { accpetCollecting, history, inputMode } from './storage'
import { DEPLOY_HOST, NETLIFY_FUNCTION_HOST } from './logic/constants'
import type { TriesMeta } from './logic'

const isDeploy = DEPLOY_HOST === location.host

let _uid = localStorage.getItem('handle-uid')!
if (!_uid) {
  _uid = nanoid()
  localStorage.setItem('handle-uid', _uid)
}

export function preparePayload(day: number, meta: TriesMeta) {
  if (!meta || (!meta.passed && !meta.failed) || meta.sent)
    return

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { sent, tries, ...rest } = toRaw(meta)
  const payload = {
    id: `${_uid}-${day}`,
    uid: _uid,
    day,
    inputMode: inputMode.value,
    tries: tries?.join(','),
    triesCount: tries?.length,
    ...rest,
  }

  return payload
}

export async function sendAnalytics(day = dayNo.value) {
  if (!accpetCollecting.value || !isDeploy)
    return

  const meta = history.value[day]

  uploadPayloads([preparePayload(day, meta)])
}

async function uploadPayloads(payloads: ReturnType<typeof preparePayload>[]) {
  const items = payloads.filter(<T>(i: T | undefined): i is T => !!i)
  if (!items.length)
    return

  let error
  try {
    const result = await axios.post(`${NETLIFY_FUNCTION_HOST}/upload`, items)
    error = result.data?.error
  }
  catch (e) {
    error = e
  }

  // mark as sent
  if (!error) {
    items.forEach((i) => {
      if (history.value[i.day])
        history.value[i.day].sent = true
    })
  }

  if (error)
    console.error(error)
}

export async function sendHistoryAnalytics() {
  if (!accpetCollecting.value || !isDeploy)
    return

  const payloads = Object.entries(history.value)
    .map(([day, meta]) => preparePayload(Number(day), meta))

  await uploadPayloads(payloads)
}

export async function getReport() {
  const { data } = await axios.get(`${NETLIFY_FUNCTION_HOST}/report?day=${dayNo.value}`)
  return data
}
