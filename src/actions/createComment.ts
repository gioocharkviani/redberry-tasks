"use server";

import { createComment } from "@/services";
import { createCommentBody } from "@/types";

export const createCommentAction = async ({
  commentData,
  taskId,
}: {
  taskId: number;
  commentData: createCommentBody;
}) => {
  try {
    const res = await createComment({ commentData, taskId });
    return res;
  } catch (error) {
    return error;
  }
};
