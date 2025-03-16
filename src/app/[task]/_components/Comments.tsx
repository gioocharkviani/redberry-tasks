"use client";
import { Comment } from "@/types";
import React, { useState, useRef } from "react";
import Button from "@/components/ui/Buttons";
import Image from "next/image";
import { createCommentAction } from "@/actions/createComment";
import { z } from "zod";

const commentTextSchema = z
  .string()
  .min(1, "Comment cannot be empty")
  .trim()
  .refine((value) => value.length > 0, {
    message: "Comment cannot be just whitespace",
  });

const Comments = ({ data, taskId }: { data: Comment[]; taskId: number }) => {
  const [commentDataState, setCommentDataState] = useState<Comment[]>(data);
  const commentCount: number = commentDataState.length;

  const [newCommentText, setNewCommentText] = useState<string>("");
  const [parentId, setParentId] = useState<number | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const handleReplyClick = (commentId: number) => {
    setParentId(commentId);
    setNewCommentText("");
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleCommentSubmit = async () => {
    try {
      commentTextSchema.parse(newCommentText);
    } catch (error) {
      console.error("Validation failed:", error);
      return;
    }

    if (!newCommentText.trim()) return;

    const commentData = {
      text: newCommentText,
      parent_id: parentId,
    };
    try {
      const newComment = await createCommentAction({ commentData, taskId });
      if (!newComment.parent_id) {
        setCommentDataState((prev) => {
          return [newComment, ...prev];
        });
      } else {
        setCommentDataState((prev) => {
          const updatedComments = prev.map((comment) => {
            if (comment.id === newComment.parent_id) {
              return {
                ...comment,
                sub_comments: [...(comment.sub_comments || []), newComment],
              };
            }
            return comment;
          });
          return updatedComments;
        });
      }
      setNewCommentText("");
      setParentId(null);
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isCommentValid =
    newCommentText.trim() &&
    commentTextSchema.safeParse(newCommentText).success;

  return (
    <div className="flex flex-col">
      <div className="bg-white w-full flex flex-col gap-[10px] pt-[18px] rounded-[10px] pb-[15px] px-[20px]">
        <textarea
          ref={textareaRef}
          placeholder="დაწერე კომენტარი"
          required
          className="w-full bg-white outline-0 resize-none"
          value={newCommentText}
          onChange={handleTextChange}
        />
        <div className="flex justify-end">
          <Button
            type="fourth"
            className="w-max"
            onClick={handleCommentSubmit}
            disabled={!isCommentValid}
          >
            დააკომენტარე
          </Button>
        </div>
      </div>
      <div className="mt-[63px]">
        {/* CommentTitle */}
        <div className="flex items-center gap-[7px]">
          <h3 className="text-[20px] font-[500]">კომენტარები</h3>
          <div className="rounded-[30px] p-[10px] text-[14px] font-[500] text-white bg-[#8338EC]">
            {commentCount}
          </div>
        </div>
        {/* CommentTitle */}

        <div className="mt-[40px] flex flex-col gap-[38px]">
          {commentCount === 0 ? (
            <div className="text-center text-gray-500">
              დავალებაზე კომენტარები არ არის
            </div>
          ) : (
            commentDataState.map((i) => {
              const avatar = i.author_avatar;
              return (
                <div key={i.id} className="flex gap-[12px]">
                  <div className="w-[38px] h-[38px] bg-slate-200 overflow-hidden rounded-full shrink-0">
                    <Image
                      loading="lazy"
                      src={avatar}
                      width={38}
                      height={38}
                      alt="avatar"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[18px] font-[500]">
                      {i.author_nickname}
                    </span>
                    <span className="text-[16px] font-[350]">{i.text}</span>
                    <div className="mt-[15px]">
                      <Button
                        icon
                        type="third"
                        onClick={() => handleReplyClick(i.id)}
                      >
                        უპასუხე
                      </Button>
                    </div>
                    {/* ReplayBox */}
                    {i.sub_comments?.map((subComment) => (
                      <div
                        key={subComment.id}
                        className="flex gap-[12px] mt-[20px]"
                      >
                        <div className="w-[38px] h-[38px] bg-slate-200 overflow-hidden rounded-full shrink-0">
                          <Image
                            loading="lazy"
                            src={subComment.author_avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[18px] font-[500]">
                            {subComment.author_nickname}
                          </span>
                          <span className="text-[16px] font-[350]">
                            {subComment.text}
                          </span>
                        </div>
                      </div>
                    ))}
                    {/* ReplayBox */}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;
