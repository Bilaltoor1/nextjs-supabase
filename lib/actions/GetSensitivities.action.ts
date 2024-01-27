import  supabase from '@/lib/supabase/server'
export  async  function getSensitivities(){
    'use server'
    return supabase.from('reading ').select('*')
}