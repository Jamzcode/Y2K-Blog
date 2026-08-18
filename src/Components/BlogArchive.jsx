import { useEffect, useState } from "react";
import { getPublishedPosts } from "../api/posts";

export default function BlogArchive() {
  const [archive, setArchive] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublishedPosts();
        setArchive(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1>Past Blog Posts</h1>
      <div className="flex flex-col gap-2">
        {archive.map((blog, key) => (
          <div className="bg-amber-50 text-center" key={blog.id}>
            {`${blog.title} ${blog.content}`}
          </div>
        ))}
      </div>
    </div>
  );
}
