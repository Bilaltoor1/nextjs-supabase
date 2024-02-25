import React from 'react';
import {Delete} from "lucide-react";
import DeleteAlert from "@/app/(admin)/components/DashboardMain/DeleteAlert";

function Page({params} : {params : {id : string}}) {
    return (
        <div>
            <h1>delete page {params.id}</h1>
            <DeleteAlert id={params.id} slug='/dashboard'/>
        </div>
    );
}

export default Page;