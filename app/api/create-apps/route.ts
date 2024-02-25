import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("games_apps").insert(data);

    return NextResponse.json({response})
}


export async function PUT(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("games_apps").update(data).eq('id', data.id)
    return NextResponse.json(response)
}

export async function DELETE(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("games_apps").delete().eq('id', data.id)
    return NextResponse.json(response)
}