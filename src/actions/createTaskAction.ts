"use server";
import { createNewTask } from "@/services";
import { CreateTask } from "@/types";

export const createTaskAction = async (data: CreateTask) => {
  try {
    const res = await createNewTask(data);

    return res;
  } catch (error) {
    return error;
  }
};
