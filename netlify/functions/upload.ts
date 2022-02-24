import type { Handler } from '@netlify/functions'
import { supabase } from '../supabase'
import { dayNo } from '../date'

export const handler: Handler = async(event) => {
  const data = JSON.parse(event.body || '[]') || []

  const { error } = await supabase.from('uploads')
    .insert(
      data
        .filter((i: any) => i.day && Math.abs(i.day - dayNo) <= 3),
    )

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    }
  }
  else {
    return {
      statusCode: 200,
    }
  }
}
