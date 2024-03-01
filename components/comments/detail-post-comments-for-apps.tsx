"use client";
import DetailPostCommentWrapper from "@/components/comments/detail-post-wrapper";
import PostComment from "@/components/comments/postComment";
import NoComment from "@/components/comments/NoComment";
import { getCommentsForGamesAndApps } from "@/lib/actions/GetSensitivities.action";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const DetailPostCommentForApps = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<any>([]);
  const getCommentsData = async () => {
    const result = await getCommentsForGamesAndApps(slug);
    if (result) {
      const { comments } = result;
      setComments(comments);
    }
    setComments(comments);
  };
  useEffect(() => {
    getCommentsData();
  }, []);
  return (
    <DetailPostCommentWrapper>
      <div className="py-5">
        {comments.length === 0 ? (
          <NoComment />
        ) : (
          comments?.map((comment: any) => (
            <PostComment
              key={comment?.id}
              id={comment.id}
              user_name={comment.user_name}
              user_img={comment.user_img}
              content={comment.content}
              created_at={comment.created_at}
            />
          ))
        )}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostCommentForApps;
