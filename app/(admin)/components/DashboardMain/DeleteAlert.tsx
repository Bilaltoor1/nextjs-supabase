"use client";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteSensitivityDeviceById } from "@/lib/actions/GetSensitivities.action";
import { ChangeEvent, useTransition } from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";
import {SketchLogoIcon} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
export default function DeleteAlert({ id ,slug }: { id: string , slug : string }) {
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const { error } = JSON.parse(
                await deleteSensitivityDeviceById(id , slug)
            ) as PostgrestSingleResponse<null>;
            if (error) {
                toast({
                    title: "Fail to update ",
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error?.message}</code>
						</pre>
                    ),
                });
            } else {
                toast({
                    title: "Successfully delete 🎉",
                });
            }
        });
    };

    return (
        <AlertDialog >
            <AlertDialogTrigger asChild>
                <Button className="flex gap-2 items-center text-dark300_light700" variant="outline">
                    <TrashIcon />
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="background-light700_dark300 ">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your blog and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form onSubmit={onSubmit}>
                        <Button className="flex gap-2 items-center">
                            <SketchLogoIcon
                                className={cn(" animate-spin ", {
                                    hidden: !isPending,
                                })}
                            />{" "}
                            Continue
                        </Button>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}