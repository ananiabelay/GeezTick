import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

// export const supabase = createClient(  process.env.NEXT_PUBLIC_SUPABASE_URL! ,  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
//   auth: {
//     persistSession: true, // Crucial for client-side useEffect storage
//     autoRefreshToken: true,
//   }
// })

// export const browservalue = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
// );

// import { createBrowserClient } from '@supabase/ssr';

// export const supabase = createBrowserClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Fixed variable name to match your server configuration
// );