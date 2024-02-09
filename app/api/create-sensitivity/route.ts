import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    // const cookieStore = cookies();
    const supabase = supabaseServerClient();
    const data = await request.json();

    const response = await supabase.from("sensitivities").insert(data).select().single();

    return NextResponse.json(response)
}

