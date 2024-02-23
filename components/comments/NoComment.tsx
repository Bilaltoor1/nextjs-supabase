import React from 'react';
import {PencilIcon} from 'lucide-react'
function NoComment() {
    return (
        <div className='flex justify-center items-center'>
            <PencilIcon size={30} className='mr-2 fill-primary-500 text-white'/>
            <h1 className='h4-bold text-light-500'>No Comment available yet 😍</h1>
        </div>
    );
}

export default NoComment;