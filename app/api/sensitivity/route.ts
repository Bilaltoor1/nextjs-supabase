import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("sensitivity_device").insert(data[0]);
    await supabase.from("sensitivities").insert(data[1])

    return NextResponse.json('response')
}

export async function GET(request: Request) {
    // const cookieStore = cookies();
    const supabase = supabaseServerClient();

    const response = await supabase.from("sensitivity_device").select('* , sensitivities(*) , comments(*)')

    return NextResponse.json(response)
}

export async function DELETE(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("sensitivity_device").delete().eq('id', data.id)
    return NextResponse.json(response)
}

export async function PUT(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("sensitivity_device").update(data[0]).eq('id', data[0].id)
    await supabase.from("sensitivities").update(data[1]).eq('device_id', data[0].id)
    return NextResponse.json(response)
}
