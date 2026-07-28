import { useState } from "react";

export default function Home() {
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  const getPublishedBlogs = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts/published");
      const data = await response.json();
      setPublishedBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {`The year is y2k, the future is now! <3`}
      <div class="border-2 h-full bg-amber-50">
        {publishedBlogs.map((blog) => (
          <div>{`${blog.title} ${blog.content}`}</div>
        ))}
      </div>
      <button
        className="aero-btn"
        onClick={() => {
          getPublishedBlogs();
        }}
      >
        Get Published Blogs
      </button>
    </>
  );
}
