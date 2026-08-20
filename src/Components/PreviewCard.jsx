import { useState, useEffect } from "react";
import { getPublishedPosts } from "../api/posts";
import pic1 from "../assets/AB_headshot.jpeg";

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
          <div className="bg-slate-50 rounded-lg border-3 border-slate-400 p-2 w-xl h-50 ">
            <div className="text-amber-600 font-semibold italic">
              01-25-2026
            </div>{" "}
            <div className="flex gap-2 bg-amber-200 rounded-l-3xl">
              <img
                src={pic1}
                className="w-10 h-10 rounded-3xl border-2 border-slate-500"
              />
              <div className="flex items-center">
                <p>Dr. B</p>
              </div>
            </div>
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
