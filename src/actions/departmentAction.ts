"use server";
import { getDepartments } from "@/services";

export const getAllDepartment = async () => {
  try {
    const res = await getDepartments();
    return res;
  } catch (error) {
    return error;
  }
};
