import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
const DASHBOARD = '/dashboard';
export async function PATCH(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("games_apps").update({is_published : data.is_published}).eq('id', data.id)
    console.log(response , 'this is update response')
    revalidatePath(DASHBOARD);
    return NextResponse.json(response)
}