import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";
import {revalidatePath} from "next/cache";
const DASHBOARD = '/dashboard/get-comments-table';
export async function PATCH(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("comments").update({is_published : data.is_published}).eq('id', data.id)
    console.log(response , 'comments is published response')
    revalidatePath(DASHBOARD);
    return NextResponse.json(response)
}