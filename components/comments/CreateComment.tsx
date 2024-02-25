"use client";
import {useToast} from "@/components/ui/use-toast"
import {CreateCommentsAction, CreateCommentsActionForGamesAndApps} from "@/lib/actions/CreateComments.action";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import detailCommentConfig from '@/config/detail/detail-comment-config'
import {zodResolver} from "@hookform/resolvers/zod";
import {SendIcon, Loader2 as SpinnerIcon} from "lucide-react";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import CommentLogin from "@/components/comments/CommentLogin";
import {createSupabaseBrowserClient} from "@/lib/supabase/BrowserClient";

const commentFormSchema = z.object({
    comment: z
        .string()
        .min(3, {message: 'Comment must be at least 3 characters long.'})
        .max(500, {message: 'Comment must be at most 500 characters long.'}),
});

type FormValues = z.infer<typeof commentFormSchema>;

interface DetailPostCommentFormProps {
    post_slug: string;
}

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
    comment: "",
};

const DetailPostCommentForm: React.FC<DetailPostCommentFormProps> = ({
                                                                         post_slug,

                                                                     }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = React.useState<any>(null);
    const {toast} = useToast()
    const form = useForm<FormValues>({
        resolver: zodResolver(commentFormSchema),
        defaultValues,
        mode: "onChange",
    });

    async function getSesssion() {

        const supabase = createSupabaseBrowserClient();

        try {
            const {data: user, error} = await supabase.auth.getSession();

            if (error) {
                throw error;
            }

            setUser(user)
            console.log(user)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function onSubmit(data: FormValues) {
        setIsLoading(true);

        const CommentData = {
            post_slug: post_slug,
            user_img: user?.session.user.user_metadata.avatar_url,
            user_name: user?.session.user.user_metadata.full_name,
            content: data.comment,
        };
        console.log(data);
        if(pathname.includes('/sensitivity/')){
            const response = await CreateCommentsAction({CommentData});
            if (response) {
                setIsLoading(false);

                router.refresh();
            } else {
                setIsLoading(false);
                toast({
                    description: "?? Something went wrong. Please try again.",
                })
            }
        } else {
            const response = await CreateCommentsActionForGamesAndApps({CommentData});
            if (response) {
                setIsLoading(false);

                router.refresh();
            } else {
                setIsLoading(false);
                toast({
                    description: "?? Something went wrong. Please try again.",
                })
            }
        }


    }

    useEffect(() => {
        getSesssion()
    }, []);
    return (
        <div className='flex flex-col'>
            <CommentLogin/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({field}) => (
                            <FormItem>
                                {/*<FormLabel>{detailCommentConfig.title}</FormLabel>*/}
                                <FormControl>
                                    <Textarea {...field} placeholder='Write your comment here...'
                                              className="background-light900_dark300 text-dark300_light700 dark:border-none focus:outline-none"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="group flex items-center justify-center rounded-lg bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 p-2 text-gray-400 shadow-md shadow-black/5 ring-1 ring-black/10 transition duration-200 hover:bg-gradient-to-tr hover:from-gray-200 hover:via-gray-100 hover:to-gray-50 active:scale-[96%] active:ring-black/20"
                    >
                        {isLoading ? (
                            <SpinnerIcon className="mr-2 h-4 w-4 animate-spin text-gray-600"/>
                        ) : (
                            <SendIcon className="mr-2 h-4 w-4 text-gray-600"/>
                        )}
                        <span className="text-gray-600">{detailCommentConfig.submit}</span>
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default DetailPostCommentForm;


