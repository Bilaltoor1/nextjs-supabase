import {NextResponse} from "next/server";
import {supabaseServerClient} from "@/lib/supabase/server";

export async function GET(request: Request, context: any) {
    const supabase = supabaseServerClient();
    const url = new URL(request.url);
    const slug = url.pathname.split('/').pop();
    console.log(slug)
    const {params} = context;
    console.log(params)
    const {data, error} = await supabase
        .from('sensitivity_device')
        .select(`* , sensitivities(*)`)
        .eq('slug', params.slug)
        .single();
    return NextResponse.json({data})
}