"use server";
import { cookies } from 'next/headers';
import {createClient} from "@/lib/supabase/serverClient";
import { supabaseServerClient } from '../supabase/server';

const DASHBOARD = '/dashboard';
export async function CreateGameAndAppAction({appsData} : any) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore)
    const response = await supabase.from('games_apps').insert(appsData).single()
    return response
}

export async function getGamesAndApps(params: any) {
    try {
      const { searchQuery, filter, page = 1, pageSize = 4 } = params;
  
      let query = `/games_apps?limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  
      if (searchQuery) {
        query += `&name=ilike.*${encodeURIComponent(searchQuery)}*`;
      }
  
      switch (filter) {
        case "game":
          query += "&category=eq.game";
          break;
        case "apps":
          query += "&category=eq.apps";
          break;
        default:
          break;
      }
  
      const res = await fetch(
        process.env.NEXT_PUBLIC_SUPABASE_URL! + "/rest/v1/" + query,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          cache: "force-cache",
        }
      );
  
      const response = await fetch(
        process.env.NEXT_PUBLIC_SUPABASE_URL! +
          "/rest/v1/" +
          `/games_apps?limit="*"&is_published=eq.true`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          cache: "force-cache",
        }
      );
      const gamesAppsLength = await response.json();
      const totalPosts = gamesAppsLength.length;
      const isNext = totalPosts > page * pageSize; // Assuming pageSize = 4
  
      const GamesAndApps = await res.json();
      return { GamesAndApps, isNext };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // export async function getGamesAndAppsForAdmin(params: any) {
  //   try {
  //     const { searchQuery, filter, page = 1, pageSize = 4 } = params;
  
  //     let query = `/games_apps?limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  
  //     if (searchQuery) {
  //       query += `&name=ilike.*${encodeURIComponent(searchQuery)}*`;
  //     }
  
  //     switch (filter) {
  //       case "game":
  //         query += "&category=eq.game";
  //         break;
  //       case "apps":
  //         query += "&category=eq.apps";
  //         break;
  //       default:
  //         break;
  //     }
  //     const supabase = supabaseServerClient();
  //     const {data} = await supabase.auth.getSession();
  //     const res = await fetch(
  //       process.env.NEXT_PUBLIC_SUPABASE_URL! + "/rest/v1/" + query,
  //       {
  //         headers: {
  //           apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //           "Authorization": `Bearer ${data.session?.access_token}`,
  //           cache:"no-cache"
  //         },
  //       }
  //     );
  
  //     const response = await fetch(
  //       process.env.NEXT_PUBLIC_SUPABASE_URL! +
  //         "/rest/v1/" +
  //         `/games_apps?limit="*"`,
  //       {
  //         headers: {
  //           apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //         },
  //         cache:"no-cache"
  //       }
  //     );
  //     const gamesAppsLength = await response.json();
  //     const totalPosts = gamesAppsLength.length;
  //     const isNext = totalPosts > page * pageSize; // Assuming pageSize = 4
  
  //     const GamesAndApps = await res.json();
  //     return { GamesAndApps, isNext };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  export async function getSingleGameAndApp(slug: string) {
    "use server";
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/games_apps?slug=eq.${slug}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json',
        },
        cache:"force-cache"
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data)
      const app = data[0]; 
  
      return { app };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
export async function getGamesAndAppsForAdmin(params: any) {
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
