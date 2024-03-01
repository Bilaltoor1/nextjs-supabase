"use server";
import { supabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const DASHBOARD = "/dashboard";

export async function getSensitivities(params: any) {
  try {
    const { searchQuery, filter, page = 1, pageSize = 4 } = params;

    let query = `/sensitivity_device?limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }`;

    if (searchQuery) {
      query += `&device_name=ilike.*${encodeURIComponent(searchQuery)}*`;
    }

    switch (filter) {
      case "newest":
        query += "&order=created_at.desc";
        break;
      case "oldest":
        query += "&order=created_at.asc";
        break;
      case "unanswered":
        query += "&answers=lt.1";
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
        cache: "no-store",
      }
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_URL! +
        "/rest/v1/" +
        `/sensitivity_device?limit="*"&is_published=eq.true`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
        cache: "no-store",
      }
    );
    const sensitivity_deviceLength = await response.json();
    const totalPosts = sensitivity_deviceLength.length;
    const isNext = totalPosts > page * pageSize; // Assuming pageSize = 4
    console.log(isNext, "isNext");
     
    const sensitivity_device = await res.json();
    return { sensitivity_device, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSensitivitiesForAdmin(params: any) {
  "use server";
  try {
    const { searchQuery, filter, page = 1, pageSize = 4 } = params;

    let query = `/sensitivity_device?limit=${pageSize}&offset=${
      (page - 1) * pageSize
    }`;

    if (searchQuery) {
      query += `&device_name=ilike.*${encodeURIComponent(searchQuery)}*`;
    }

    switch (filter) {
      case "newest":
        query += "&order=created_at.desc";
        break;
      case "oldest":
        query += "&order=created_at.asc";
        break;
      case "unanswered":
        query += "&answers=lt.1";
        break;
      default:
        break;
    }
    const supabase = supabaseServerClient();
    const {data} = await supabase.auth.getSession();
    const res = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_URL! + "/rest/v1/" + query,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${data.session?.access_token}`
        },
      }
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_SUPABASE_URL! +
        "/rest/v1/" +
        `/sensitivity_device?limit="*"`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        },
      }
    );
    const sensitivity_deviceLength = await response.json();
    const totalPosts = sensitivity_deviceLength.length;
    const isNext = totalPosts > page * pageSize; // Assuming pageSize = 4

    const sensitivity_device = await res.json();
    return { sensitivity_device, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSingleDevice(slug: string) {
  "use server";
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sensitivity_device?slug=eq.${slug}&select=*,sensitivities(*)`;

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
    const device = data[0]; 

    return { device };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getComments(slug: string, limit: number = 5) {
  "use server";
  const supabase = supabaseServerClient();

  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .match({"post_slug": slug , "is_published": true})
      .order("created_at", { ascending: false })
      .limit(limit);
    const { count: totalComments } = await supabase
      .from("comments")
      .select("id", { count: "exact" })
      .eq("post_slug", slug);
    if (error) {
      throw error;
    }

    return { comments, totalComments };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getCommentsForGamesAndApps(
  slug: string,
  limit: number = 5
) {
  "use server";
  const supabase = supabaseServerClient();

  try {
    const { data: comments, error } = await supabase
      .from("apps_comments")
      .select("*")
      .eq("post_slug", slug)
      .order("created_at", { ascending: false })
      .limit(limit);
    const { count: totalComments } = await supabase
      .from("comments")
      .select("id", { count: "exact" })
      .match({"post_slug": slug , "is_published": true});
    if (error) {
      throw error;
    }

    return { comments, totalComments };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteSingleComment(id: string) {
  "use server";
  const supabase = supabaseServerClient();

  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { comments };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteSingleCommentFromGameAndApps(id: string) {
  "use server";
  const supabase = supabaseServerClient();

  try {
    const { data: comments, error } = await supabase
      .from("apps_comments")
      .delete()
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { comments };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateIsPublishedComments(
  id: string,
  is_published: boolean
) {
  "use server";
  const supabase = supabaseServerClient();

  try {
    const { data: comments, error } = await supabase
      .from("comments")
      .update({ is_published: is_published })
      .eq("id", id);
    if (error) {
      throw error;
    }
    return { comments };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

  
export async function deleteSensitivityDeviceById(id: string, slug: string) {
  const supabase = await supabaseServerClient();
  const result = await supabase
    .from("sensitivity_device")
    .delete()
    .eq("id", id);
  revalidatePath(DASHBOARD);
  revalidatePath("/is_published_sensitivity/" + slug);
  return JSON.stringify(result);
}

export async function updateSensitivityDeviceById(id: string, data: any) {
  const supabase = supabaseServerClient();
  const result = await supabase
    .from("sensitivity_device")
    .update(data)
    .eq("id", id);
  revalidatePath(DASHBOARD);
  revalidatePath("/is_published_sensitivity/" + id);
  return JSON.stringify(result);
}

export async function updateSensitivityDetail(sensitivityData: any) {
  const supabase = supabaseServerClient();
  const resultBlog = await supabase
    .from("sensitivity_device")
    .update(sensitivityData[0])
    .eq("id", sensitivityData.id);
  await supabase
    .from("sensitivities")
    .update(sensitivityData[1])
    .eq("device_id", sensitivityData[0].id);
  if (resultBlog.error) {
    return JSON.stringify(resultBlog);
  } else {
    revalidatePath(DASHBOARD);
    revalidatePath("/is_published_sensitivity/" + sensitivityData[0].slug);
  }
}
// export async function getSession () {
//     "use server"
//     const supabase =  supabaseServerClient();

//     try {
//         const {data: user, error} = await supabase.auth.getSession();

//         if (error) {
//             throw error;
//         }

//         return {user};
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
//export async function getSensitivities(params: any) {
  //   const supabase = supabaseServerClient();
  
  //   try {
  //     const { searchQuery, filter, page = 1, pageSize = 4 } = params;
  
  //     let query = supabase
  //       .from("sensitivity_device")
  //       .select("*")
  //       .range((page - 1) * pageSize, page * pageSize - 1);
  
  //     if (searchQuery) {
  //       query.ilike("device_name", `%${searchQuery}%`);
  //     }
  
  //     switch (filter) {
  //       case "newest":
  //         query.order("created_at", { ascending: false });
  //         break;
  //       case "oldest":
  //         query.order("created_at", { ascending: true });
  //         break;
  //       case "unanswered":
  //         query.not("answers", ">", 0);
  //         break;
  //       default:
  //         break;
  //     }
  
  //     const { data: sensitivity_device, error } = await query;
  
  //     if (error) {
  //       throw error;
  //     }
  
  //     const { count: totalPosts } = await supabase
  //       .from("sensitivity_device")
  //       .select("id", { count: "exact" });
  //     // @ts-ignore
  //     const isNext = totalPosts > page * pageSize;
  
  //     return { sensitivity_device, isNext };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
  
  // export async function getSingleDevice(slug: string) {
  //   "use server";
  //   const supabase = supabaseServerClient();
  
  //   try {
  //     const { data: device, error } = await supabase
  //       .from("sensitivity_device")
  //       .select(`* , sensitivities(*)`)
  //       .eq("slug", slug)
  //       .single();
  
  //     if (error) {
  //       throw error;
  //     }
  
  //     return { device };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }