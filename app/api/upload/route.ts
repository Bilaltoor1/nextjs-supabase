import {supabaseServerClient} from "@/lib/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const bucketName = 'images';
    const supabase = supabaseServerClient();

    const file = await request.blob();
    const header = headers();
    const fileName = header.get("X-Vercel-Filename");

    if(fileName) {
        await supabase.storage.from(bucketName).upload(fileName, file);

        const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

        return NextResponse.json({
            url: data.publicUrl
        })
    }

    return NextResponse.json({
        url: ''
    })
}