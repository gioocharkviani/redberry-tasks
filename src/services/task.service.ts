export async function getAllTask() {
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
