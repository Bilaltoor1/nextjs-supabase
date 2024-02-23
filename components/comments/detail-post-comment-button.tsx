"use client";

import detailCommentConfig from "@/config/detail/detail-comment-config";
import {LucideMessageSquare , MessageCircleDashedIcon } from "lucide-react";
import React from "react";
import ScrollIntoView from "react-scroll-into-view";

interface DetailPostCommentButtonProps {
    totalComments?: number;
}

const DetailPostCommentButton: React.FC<DetailPostCommentButtonProps> = ({
                                                                             totalComments = 0,
                                                                         }) => {
    const [isHovering, setIsHovered] = React.useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <ScrollIntoView selector="#comments" className="flex  ">
            <button
                type="button"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="relative mx-auto inline-flex w-fit items-center justify-center rounded-md border border-black/5 bg-gray-50 dark:dark-gradient p-2  hover:shadow-sm"
            >
                {isHovering ? (
                    <LucideMessageSquare className="-ml-0.5 h-5 w-5 text-gray-400" />
                ) : (
                    <MessageCircleDashedIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
                )}
                <span className="absolute -right-[5px] -top-[10px] rounded-full bg-white px-[4px] text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-black/5">
          {totalComments}
        </span>
                <span className="ml-2 hidden text-sm text-gray-400 group-hover:text-gray-900 md:flex">
          {detailCommentConfig.comments}
        </span>
            </button>
        </ScrollIntoView>
    );
};

export default DetailPostCommentButton;
