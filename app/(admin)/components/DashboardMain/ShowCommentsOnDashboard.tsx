import React, {useEffect, useState} from 'react';
import {getComments} from "@/lib/actions/GetSensitivities.action";


function ShowCommentsOnDashboard({slug}: { slug: string }) {
    const [commentCount , setCommentsCount] = useState(0)
    const getComment = async () => {
       const {totalComments} = await getComments(slug)
        // @ts-ignore
        setCommentsCount(totalComments)

    }
    useEffect(() => {
        getComment()
    },[slug])
    return (
        <h3>{commentCount > 0 ? commentCount : 0}</h3>
    );
}

export default ShowCommentsOnDashboard;