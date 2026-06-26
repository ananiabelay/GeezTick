import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Accesses your public environment variables safely on the browser
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}