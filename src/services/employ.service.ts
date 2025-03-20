import { unstable_noStore, revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getAllemploy() {
  unstable_noStore();
  try {
    const res = await fetch(`${process.env.BASE_URL}/employees`, {
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

export const createNewEmploy = async (body: FormData) => {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  revalidatePath(`/${pathname}`);
  try {
    const res = await fetch(`${process.env.BASE_URL}/employees`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PERSONAL_TOKEN}`,
      },
      body: body,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
