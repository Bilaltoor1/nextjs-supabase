import React from 'react';
import UpdateGameEditor from "@/app/(admin)/components/UpdateGame/updateGameEditor";

async function Page({params}: { params: { slug: string}}) {
    const data = await fetch(process.env.URL + `/api/create-apps/${params.slug}`,{
        method:'GET',
    });
    const device = await data.json();
    return (
        <div>
            <UpdateGameEditor dfval={device}/>
        </div>
    );
}

export default Page;