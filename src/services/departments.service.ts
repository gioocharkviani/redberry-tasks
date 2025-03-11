export async function getDepartments() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/departments`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
