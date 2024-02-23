import {supabaseServerClient} from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const supabase = supabaseServerClient();
    const data = await request.json();
    const response = await supabase.from("sensitivity_device").insert(data[0]);
    await supabase.from("sensitivities").insert(data[1])

    return NextResponse.json('response')
}

export async function GET(request: Request,context: any) {
    let response;
    console.log(context)
    const supabase = supabaseServerClient();
    const {searchParams} = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || '1');
    const pageSize = parseInt(searchParams.get("pageSize") || '2');
    const filter = searchParams.get("filter") || '';
    let query = supabase
        .from('sensitivity_device')
        .select('*')
        .range((page - 1) * pageSize, page * pageSize - 1);
    if (searchQuery) {
        query.ilike('device_name', `%${searchQuery}%`);
    }

    switch (filter) {
        case 'newest':
            query.order('created_at', {ascending: false});
            break;
        case 'oldest':
            query.order('created_at', {ascending: true});
            break;
        case 'unanswered':
            query.not('answers', '>', 0);
            break;
        default:
            break;
    }

    response = await query;
    const {count: totalPosts} = await supabase
        .from('sensitivity_device')
        .select('id', {count: 'exact'});

    // @ts-ignore
    const isNext = totalPosts > page * pageSize;
    return NextResponse.json({
        response,
        isNext
    });
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
