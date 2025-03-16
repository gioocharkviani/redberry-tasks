"use server";
import { revalidatePath } from "next/cache";
import { changeStatus } from "@/services";

export async function changeStatusAction({
  statusId,
  taskId,
}: {
  statusId: number;
  taskId: number;
}) {
  revalidatePath("/");
  try {
    const res = await changeStatus(statusId, taskId);
    return res;
  } catch (error) {
    return error;
  }
}
