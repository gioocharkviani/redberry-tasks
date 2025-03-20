import { createCommentBody } from "@/types";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getAllComment(id: number) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/tasks/${id}/comments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PERSONAL_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function createComment({
  commentData,
  taskId,
}: {
  taskId: number;
  commentData: createCommentBody;
}) {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  revalidatePath(`/${pathname}`);
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/tasks/${taskId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PERSONAL_TOKEN}`,
        },
        body: JSON.stringify(commentData),
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
