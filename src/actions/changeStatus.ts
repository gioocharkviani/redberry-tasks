"use server";

import { changeStatus } from "@/services";

export async function changeStatusAction({
  statusId,
  taskId,
}: {
  statusId: number;
  taskId: number;
}) {
  try {
    const res = await changeStatus(statusId, taskId);
    return res;
  } catch (error) {
    return error;
  }
}
