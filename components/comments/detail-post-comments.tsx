'use client';
import { useEffect, useState } from "react";
import DetailPostCommentWrapper from "@/components/comments/detail-post-wrapper";
import PostComment from "@/components/comments/postComment";
import NoComment from "@/components/comments/NoComment";
import {getComments} from "@/lib/actions/GetSensitivities.action";

export const dynamic = "force-dynamic";
export const revalidate = 0;


const DetailPostComment =  ({slug}: { slug: string }) => {
    const [comments, setComments] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const getCommentsData = async () => {
        setLoading(true);
        const {comments} = await getComments(slug);
        setComments(comments);
        setLoading(false);
    }
    useEffect(() => {
        getCommentsData();
    }, []);
    return (

        <DetailPostCommentWrapper>
            <div className="py-5">
                {comments.length === 0 ? <NoComment/> : comments?.map((comment: any) => (
                    <PostComment
                        key={comment?.id}
                        id={comment.id}
                        user_name={comment.user_name}
                        user_img={comment.user_img}
                        content={comment.content}
                        created_at={comment.created_at}
                    />
                ))
                }
            </div>
        </DetailPostCommentWrapper>
    );
};

export default DetailPostComment;
