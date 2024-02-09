'use client'
import React, {useState} from 'react';


 function Page() {
    const [file , setFile] = useState('')
    const createFile = (e : React.FormEvent) => {
        e.preventDefault()
       console.log(file)
    }


    return (
        <div>
            <h1>HOME PAGE</h1>
            <form onSubmit={createFile}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload
                    file</label>
                <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input" name="file_input" type="file" value={file}
                    onChange={(e) => setFile(e.target.value)}/>
                <button type='submit'>Upload</button>
            </form>
        </div>
    );
}

export default Page;