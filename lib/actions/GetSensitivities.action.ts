"use server"
import {supabaseServerClient} from "@/lib/supabase/server";
import {revalidatePath} from "next/cache";

const DASHBOARD = '/dashboard';

export async function getSensitivities(params: any) {
    const supabase =  supabaseServerClient();

    try {
        const {searchQuery, filter, page = 1, pageSize = 4} = params;

        let query = supabase
            .from('sensitivity_device')
            .select('*')
            .range((page - 1) * pageSize, page * pageSize - 1);

        if (searchQuery) {
            query.ilike('device_name', `%${searchQuery}%`)
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

        const {data: sensitivity_device, error} = await query;

        if (error) {
            throw error;
        }

        const {count: totalPosts} = await supabase
            .from('sensitivity_device')
            .select('id', {count: 'exact'});
        // @ts-ignore
        const isNext = totalPosts > page * pageSize;

        return {sensitivity_device, isNext};
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getSingleDevice(slug: string) {
    "use server"
    const supabase =  supabaseServerClient();

    try {
        const {data: device, error} = await supabase
            .from('sensitivity_device')
            .select(`* , sensitivities(*)`)
            .eq('slug', slug)
            .single();

        if (error) {
            throw error;
        }

        return {device};
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async  function getComments(slug: string | string[]) {
    "use server"
    const supabase =  supabaseServerClient();

    try {
        const {data: comments, error} = await supabase
            .from('comments')
            .select('*')
            .eq('post_slug', slug)
            .order('created_at', {ascending: false})
            .limit(5);

        if (error) {
            throw error;
        }

        return {comments};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getSession () {
    "use server"
    const supabase =  supabaseServerClient();

    try {
        const {data: user, error} = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        return {user};
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function deleteSensitivityDeviceById(id: string, slug: string) {
    const supabase = await supabaseServerClient();
    const result = await supabase.from("sensitivity_device").delete().eq("id", id);
    revalidatePath(DASHBOARD);
    revalidatePath("/sensitivity/" + slug);
    return JSON.stringify(result);
}


export async function updateSensitivityDeviceById(id: string, data: any) {
    const supabase =  supabaseServerClient();
    const result = await supabase.from("sensitivity_device").update(data).eq("id", id);
    revalidatePath(DASHBOARD);
    revalidatePath("/sensitivity/" + id);
    return JSON.stringify(result);
}


export async function updateSensitivityDetail(
    sensitivityData: any,
) {
    const supabase = supabaseServerClient();
    const resultBlog = await supabase
        .from("sensitivity_device")
        .update(sensitivityData[0])
        .eq("id", sensitivityData.id);
    await supabase.from('sensitivities').update(sensitivityData[1]).eq('device_id', sensitivityData[0].id);
    if (resultBlog.error) {
        return JSON.stringify(resultBlog);
    } else {
        revalidatePath(DASHBOARD);
        revalidatePath("/sensitivity/" + sensitivityData[0].slug);
    }
}



















