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
    <div className="page-layout">
      <h1 className="text-4xl font-[Frutiger] text-center"> TheBlogBook</h1>
      <p className="text-center italic">
        This blog is here for all my girlies that remember what technology was
        and the world could have been...
      </p>
      <div class="h-full flex gap-2">
        {publishedBlogs.slice(0, 3).map((blog, key) => (
          <div className="bg-amber-50 rounded-lg p-2">{`${blog.title} ${blog.content}`}</div>
        ))}
      </div>
      <div className="flex justify-around">
        <button
          className="aero-btn"
          onClick={() => {
            getPublishedBlogs();
          }}
        >
          Get Published Blogs
        </button>
      </div>
    </div>
  );
}
