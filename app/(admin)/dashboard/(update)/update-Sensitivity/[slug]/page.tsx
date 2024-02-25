import React from 'react';
import UpdateSensitivity from "@/app/(admin)/components/CreateSensiComponents/UpdateSensitivity";
import {getSingleDevice} from "@/lib/actions/GetSensitivities.action";

async  function Page({params} : any) {
    const sensitivityData = await getSingleDevice(params.slug)
    return(
        <UpdateSensitivity dfval={sensitivityData.device}/>
    )
}

export default Page;