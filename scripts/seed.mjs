import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing Supabase env.')
  process.exit(1)
}
const supa = createClient(url, key)

async function run() {
  const schema = fs.readFileSync('supabase/SCHEMA.sql', 'utf8')
  const seeds = fs.readFileSync('supabase/SEEDS.sql', 'utf8')
  await supa.rpc('pg_execute', { sql: schema }).catch(()=>{})
  await supa.rpc('pg_execute', { sql: seeds }).catch(()=>{})
  console.log('Seed done.')
}
run()
