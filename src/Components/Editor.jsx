import { useState, useRef, useEffect } from "react";

export default function Editor() {
  const blogPost = useRef("");
  const title = useRef("");

  // const postBlogPost = () => {
  //   alert("Post has been posted!");
  // };

  const handleSave = async () => {
    const payload = {
      title: title.current.value,
      body: blogPost.current.value,
    };

    try {
      // build URL
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label>
        {" "}
        Title:{" "}
        <input
          placeholder="Quand j'etais jeune..."
          ref={title}
          className="bg-white"
          required
        />
      </label>
      <label>
        {" "}
        Body:{" "}
        <textarea
          className="bg-white"
          placeholder="When I was a young warthooog..."
          ref={blogPost}
          required
        ></textarea>{" "}
      </label>

      {/* <button class="aero-btn" onClick={postBlogPost}>
        Post Blog
      </button> */}
      <button
        className="aero-btn"
        onClick={() => {
          handleSave();
        }}
      >
        Save Post
      </button>
    </div>
  );
}
