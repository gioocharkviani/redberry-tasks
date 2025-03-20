import { CreateTask } from "@/types";
import { unstable_noStore } from "next/cache";

export async function getAllTask() {
  unstable_noStore();
  try {
    const res = await fetch(`${process.env.BASE_URL}/tasks`, {
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

export async function getCurrentTask(id: number) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/tasks/${id}`, {
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

export const createNewTask = async (data: CreateTask) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PERSONAL_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return res;
    }

    return await res.json();
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
