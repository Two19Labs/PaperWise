import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance = null;

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase credentials are missing. Please configure them in your .env.local file and restart your server.");
  
  // Create a dummy client that throws a helpful error when any method is invoked
  supabaseInstance = {
    auth: {
      signInWithPassword: () => {
        throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file and restart your development server.");
      },
      signUp: () => {
        throw new Error("Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file and restart your development server.");
      },
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => {}
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error("Supabase not configured") })
        })
      }),
      update: () => ({
        eq: async () => ({ error: new Error("Supabase not configured") })
      })
    })
  };
}

export const supabase = supabaseInstance;
