import { nanoid } from 'nanoid'
import { dayNo } from './state'
import { history, inputMode } from './storage'

// TODO:
let _uid = localStorage.getItem('uid')
if (!_uid) {
  _uid = nanoid()
  localStorage.setItem('uid', _uid)
}
let timezone = ''
try {
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
}
catch {}

export const analyticSetting = useStorage<number>('handle-accept-analytics', 0) // 0: not sure, 1: ok, -1: no

export function sendAnalytics(day = dayNo.value) {
  if (analyticSetting.value < 0)
    return

  const meta = history.value[day]

  if (!meta || (!meta.passed && !meta.failed) || meta.sent)
    return

  const payload = {
    uid: _uid,
    day,
    inputMode,
    ...meta,
    ts: Date.now(),
    timezone,
  }

  meta.sent = true

  // TODO:
  console.log({ payload })
}
