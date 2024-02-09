"use client";
import React, {useEffect, useState} from "react";


import Uppy from "@uppy/core";
import {Dashboard} from "@uppy/react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Tus from "@uppy/tus";


import {useRouter} from "next/navigation";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";
import {Button} from "@/components/ui/button";

export default function Uploader({uuid}: { uuid: string  }) {
    // const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [session, setSession] = useState(null)
    const [file_name, setFileName] = useState('')
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();
    const getSession = async () => {
        const {data, error} = await supabase.auth.getSession();
        if (data) {
            //@ts-ignore
            setSession(data);
        } else {
            console.log("error", error);
        }
    }
    const onBeforeRequest = async (req: any) => {
        const {data} = await supabase.auth.getSession();
        req.setHeader("Authorization", `Bearer ${data.session?.access_token}`);
    };
    const [uppy] = useState(() =>
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 2,
                allowedFileTypes: ["image/*"],
                maxFileSize: 5 * 1000 * 1000,
            },
        }).use(Tus, {
            endpoint:
                process.env.NEXT_PUBLIC_SUPABASE_URL +
                "/storage/v1/upload/resumable",
            onBeforeRequest,
            allowedMetaFields: [
                "bucketName",
                "objectName",
                "contentType",
                "cacheControl",
            ],
        })
    );

    uppy.on("file-added", (file) => {
        file.meta = {
            ...file.meta,
            bucketName: "images",
            objectName: file.name,
            contentType: file.type,
        };

    });

    uppy.on("upload-success", () => {
        uppy.cancelAll();
        document.getElementById("trigger-close")?.click();
        router.refresh();
    });
    console.log(uuid)
    const handleUpload = () => {
        if (uppy.getFiles().length !== 0) {
            // const randomUUID = crypto.randomUUID();
            setFileName(uppy.getFiles()[0].name)
            uppy.setFileMeta(uppy.getFiles()[0].id, {
                objectName: uuid + "/" + uppy.getFiles()[0].name,
            });
            uppy.upload().then(async () => {
                const {data} = await supabase.from('sensitivity_device').select('img_name, img_id').eq('id', uuid).single()
                await supabase.from('sensitivity_device').update({thumbnail_url: `https://qorhrzufwprvqylcrwzt.supabase.co/storage/v1/object/public/images/${data?.img_id}/${data?.img_name}`}).eq('id', uuid);
            });
        } else {
            console.log("Please adding an image");
        }
    };
    useEffect(() => {
        getSession()
    }, [])
    return (
        <>
            <button id="upload-trigger"></button>
            <div className="w-[80% space-y-5">
                <Dashboard
                    uppy={uppy}
                    className="w-auto"
                    // hideUploadButton
                />
                <Button className="w-full" onClick={handleUpload}>
                    Upload
                </Button>
            </div>
        </>
    );
}
