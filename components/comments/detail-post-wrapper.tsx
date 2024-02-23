import React, { FC } from "react";

interface DetailPostCommentWrapperProps {
    children?: React.ReactNode;
}

const DetailPostCommentWrapper: FC<DetailPostCommentWrapperProps> = ({
                                                                         children,
                                                                     }) => {
    return (
        <div
            id="comments"
            className="mx-auto my-5 w-full rounded-md bg-gray-50 dark:dark-gradient px-7 py-5 shadow-sm ring-1 ring-black/5"
        >
            <div>{children}</div>
        </div>
    );
};

export default DetailPostCommentWrapper;
