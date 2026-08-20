import { useState, useEffect } from "react";
import { getPublishedPosts } from "../api/posts";

export default function PreviewCard() {
  const [publishedBlogs, setPublishedBlogs] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublishedPosts();
        setPublishedBlogs(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="flex justify-center gap-2">
      {publishedBlogs.slice(0, 2).map((blog, key) => (
        <div>
          <div className="bg-slate-50 rounded-lg border-4 border-slate-400 p-2 w-xl h-50 ">
            <div className="text-amber-600 italic">01-25-2026</div>
            <img src=""/>
            <h1 className="font-black">{blog.title}</h1>{" "}
            <p className="text-xs text-slate-600 font-semibold ">
              {blog.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
