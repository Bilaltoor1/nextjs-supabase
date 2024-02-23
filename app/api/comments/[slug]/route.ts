import {NextResponse} from "next/server";
import {supabaseServerClient} from "@/lib/supabase/server";

export async function GET(request: Request, context: any) {
    const supabase = supabaseServerClient();
    const {params} = context;
    const {data, error} = await supabase
        .from('comments')
        .select(`*`)
        .eq('post_slug', params.slug)
        .single();
    return NextResponse.json({
        data
    })
}