import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    // const cookieStore = cookies();
    const supabase = supabaseServerClient();

    const response = await supabase.from("sensitivity_device").select('*').limit(4).order('created_at', {ascending: true})

    return NextResponse.json({response})
}