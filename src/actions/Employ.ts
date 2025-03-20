"use server";

import { createNewEmploy } from "@/services/employ.service";

export const createEmploy = async ({ data }: { data: FormData }) => {
  try {
    const res = await createNewEmploy(data);
    return res;
  } catch (error) {
    return error;
  }
};
