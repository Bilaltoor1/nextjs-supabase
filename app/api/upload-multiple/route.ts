import { supabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const bucketName = 'images';
    const supabase = supabaseServerClient();
    // @ts-ignore
    const files = request.files.get("file");

    if (files && files.length > 0) {
        const urls = [];

        for (const file of files) {
            const fileName = file.metadata.name;

            await supabase.storage.from(bucketName).upload(fileName, file);

            const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

            urls.push(data.publicUrl);
        }

        return NextResponse.json({
            urls: urls
        });
    }

    return NextResponse.json({
        urls: []
    });
}
