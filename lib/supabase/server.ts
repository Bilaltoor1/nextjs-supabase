import {createClient} from "@supabase/supabase-js";

// @ts-ignore
export const supabase =  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

