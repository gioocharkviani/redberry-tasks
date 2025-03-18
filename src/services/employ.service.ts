import { unstable_noStore } from "next/cache";

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
  try {
    const res = await fetch(
      `https://momentum.redberryinternship.ge/api/employees`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer 9e68c5de-40cd-49f3-ba27-7a3b9e53050e`,
        },
        body: body,
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
