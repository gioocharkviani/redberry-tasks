"use client";
import { Comment } from "@/types";
import React, { useState } from "react";
import Button from "@/components/ui/Buttons";
import Image from "next/image";
import { createCommentAction } from "@/actions/createComment";
import { z } from "zod";

const commentTextSchema = z
  .string()
  .min(1)
  .trim()
  .refine((value) => value.length > 0, {
    message: "კომენტარის ველი აუცილებლად უნდა იყოს შევსებული",
  });

const Comments = ({ data, taskId }: { data: Comment[]; taskId: number }) => {
  const [commentDataState, setCommentDataState] = useState<Comment[]>(data);
  const commentCount: number = commentDataState.length;

  const [newCommentText, setNewCommentText] = useState<string>("");
  const [replayText, setReplayText] = useState<string>("");

  const [replayOpen, setReplayOpen] = useState<number | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(event.target.value);
  };

  const handleReplayTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplayText(event.target.value);
  };

  const validateCommentText = (text: string) => {
    try {
      commentTextSchema.parse(text);
    } catch (error) {
      console.error("Validation failed:", error);
      return false;
    }
    return true;
  };

  const handleCommentSubmit = async () => {
    if (!validateCommentText(newCommentText)) return;

    if (!newCommentText.trim()) return;

    const commentData = {
      text: newCommentText,
      parent_id: null,
    };

    try {
      const newComment = await createCommentAction({ commentData, taskId });
      setCommentDataState((prev) => [newComment, ...prev]);
      setNewCommentText("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const handleReplySubmit = async () => {
    if (!validateCommentText(replayText)) return;

    if (!replayText.trim()) return;

    const replyData = {
      text: replayText,
      parent_id: replayOpen,
    };

    try {
      const newReply = await createCommentAction({
        commentData: replyData,
        taskId,
      });
      setCommentDataState((prev) => {
        const updatedComments = prev.map((comment) => {
          if (comment.id === newReply.parent_id) {
            return {
              ...comment,
              sub_comments: [...(comment.sub_comments || []), newReply],
            };
          }
          return comment;
        });
        return updatedComments;
      });
      setReplayText("");
      setReplayOpen(null);
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  };

  const isCommentValid =
    newCommentText.trim() &&
    commentTextSchema.safeParse(newCommentText).success;
  const isReplyValid =
    replayText.trim() && commentTextSchema.safeParse(replayText).success;

  return (
    <div className="flex flex-col">
      <div className="bg-white w-full flex flex-col gap-[10px] pt-[18px] rounded-[10px] pb-[15px] px-[20px]">
        <textarea
          placeholder="დაწერე კომენტარი"
          required
          className="w-full bg-white outline-0 resize-none"
          value={newCommentText}
          onChange={handleTextChange}
        />
        <div className="flex justify-end">
          <Button
            btntype="fourth"
            className="w-max"
            onClick={handleCommentSubmit}
            disabled={!isCommentValid}
          >
            დააკომენტარე
          </Button>
        </div>
      </div>
      <div className="mt-[63px]">
        <div className="flex items-center gap-[7px]">
          <h3 className="text-[20px] font-[500]">კომენტარები</h3>
          <div className="rounded-[30px] p-[10px] text-[14px] font-[500] text-white bg-[#8338EC]">
            {commentCount}
          </div>
        </div>

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
                  <div className="flex flex-col w-full">
                    <span className="text-[18px] font-[500]">
                      {i.author_nickname}
                    </span>
                    <span className="text-[16px] font-[350]">{i.text}</span>
                    <div className="mt-[15px] w-full">
                      {replayOpen && replayOpen === i.id && (
                        <div
                          key={i.id}
                          className="bg-white w-full flex flex-col gap-[10px] pt-[18px] rounded-[10px] pb-[15px] px-[20px]"
                        >
                          <textarea
                            placeholder="დაწერე კომენტარი"
                            required
                            className="w-full bg-white outline-0 resize-none"
                            value={replayText}
                            onChange={handleReplayTextChange}
                          />
                          <div className="flex justify-end gap-2 items-center cursor-pointer">
                            <button
                              className="text-[14px] font-[500]"
                              onClick={() => {
                                setReplayOpen(null);
                                setReplayText("");
                              }}
                            >
                              გაუქმება
                            </button>
                            <Button
                              btntype="fourth"
                              className="w-max"
                              onClick={handleReplySubmit}
                              disabled={!isReplyValid}
                            >
                              უპასუხე
                            </Button>
                          </div>
                        </div>
                      )}
                      {replayOpen !== i.id && (
                        <Button
                          icon
                          btntype="third"
                          onClick={() => setReplayOpen(i.id)}
                        >
                          უპასუხე
                        </Button>
                      )}
                    </div>

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
