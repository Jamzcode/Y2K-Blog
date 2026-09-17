import { useEffect, useState, useRef } from "react";
import PreviewCard from "../Components/PreviewCard";
import VisitorCounter from "../Components/VisitorCounter";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const emailRef = useRef("");

  const handleSubmit = () => {
    setUserEmail(emailRef.current.value);
  };

  return (
    <div className="page-layout">
      <h1 className="text-4xl font-[Frutiger] text-center"> TheBlogBook</h1>
      <p className="text-center italic">
        This blog is here for all my girlies that remember what technology was
        and what the world could have been...
      </p>
      <div className="h-screen">
        <h2>Recent Writings:</h2>
        <PreviewCard />
      </div>
      <div className="bg-amber-50 flex flex-col items-center py-4">
        {" "}
        <p>
          Want to know when the next post drops? Sign up for our newsletter!
        </p>
        <div className="flex gap-2">
          <input
            ref={emailRef}
            type="text"
            className="border-2 text-center"
            placeholder="blogLover@email.com"
          />
          <button
            className="bg-amber-400 px-4 py-2"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex">
        <VisitorCounter />
      </div>
    </div>
  );
}
