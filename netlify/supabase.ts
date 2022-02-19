import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lxmqadkqgpcewmfffyig.supabase.co'
const SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bXFhZGtxZ3BjZXdtZmZmeWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUyNjI3NzUsImV4cCI6MTk2MDgzODc3NX0.2b1IvYNjFBCQ5wsHbkt1xBoupaaXgWL9VgVfHCQtcNQ'

export const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SERVER_KEY || process.env.SUPABASE_PUBLIC_KEY || SUPABASE_PUBLIC_KEY)
