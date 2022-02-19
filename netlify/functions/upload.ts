import type { Handler } from '@netlify/functions'
import { supabase } from '../supabase'

export const handler: Handler = async(event) => {
  const data = JSON.parse(event.body || '{}')

  const { error } = await supabase.from('uploads').insert(data)

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
