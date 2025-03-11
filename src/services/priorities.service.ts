export async function getPriorities() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/priorities`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
