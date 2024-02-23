"use server"
import { cookies } from 'next/headers';
import {createClient} from "@/lib/supabase/serverClient";
import {supabaseServerClient} from "@/lib/supabase/server";
import {revalidatePath} from "next/cache";

const DASHBOARD = '/dashboard';
export async function CreateGameAndAppAction({appsData} : any) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)
    const response = await supabase.from('games_apps').insert(appsData).single()
    return response
}

export async function getGamesAndApps(params: any) {
    const supabase =  supabaseServerClient();

    try {
        const {searchQuery, filter, page = 1, pageSize = 4} = params;

        let query = supabase
            .from('games_apps')
            .select('*')
            .range((page - 1) * pageSize, page * pageSize - 1);

        if (searchQuery) {
            query.ilike('name', `%${searchQuery}%`)
        }

        switch (filter) {
            case 'game':
                query.match({category: 'game'});
                break;
            case 'apps':
                query.match({category: 'apps'});
                break;
            default:
                break;
        }

        const {data: GamesAndApps, error} = await query;

        if (error) {
            throw error;
        }

        // Counting total posts based on the filter
        let totalPostsQuery = supabase
            .from('games_apps')
            .select('id', { count: 'exact' });

        // Adjust the count query based on the filter
        if (filter === 'apps') {
            totalPostsQuery = totalPostsQuery.eq('category', 'apps');
        }
        else if (filter === 'game') {
            totalPostsQuery = totalPostsQuery.eq('category', 'game');
        }
        const { count: totalPosts } = await totalPostsQuery;

        // Determine if there are more posts
        //@ts-ignore
        const isNext = totalPosts > page * pageSize;

        return { GamesAndApps, isNext };
    } catch (error) {
        console.error(error);
        throw error;
    }
}