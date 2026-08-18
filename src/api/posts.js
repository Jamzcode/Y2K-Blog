export async function getPublishedPosts() {
  const response = await fetch("http://localhost:3000/api/posts/published");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to load posts");
  }
  return data;
}
