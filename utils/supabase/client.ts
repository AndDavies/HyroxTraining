import { createClient } from "@supabase/supabase-js";

// For client usage, we typically rely on the "anon" key
// which is stored in NEXT_PUBLIC_ environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);