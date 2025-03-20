const BaseUrl = process.env.BASE_URL;

export async function getAllStatus() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/statuses`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function changeStatus(statisId: number, taskId: number) {
  const data = {
    status_id: statisId,
  };

  try {
    const res = await fetch(`${BaseUrl}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PERSONAL_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
