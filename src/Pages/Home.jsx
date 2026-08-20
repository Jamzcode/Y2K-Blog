import { useEffect, useState } from "react";
import PreviewCard from "../Components/PreviewCard";
import VisitorCounter from "../Components/VisitorCounter";

export default function Home() {
  return (
    <div className="page-layout">
      <h1 className="text-4xl font-[Frutiger] text-center"> TheBlogBook</h1>
      <p className="text-center italic">
        This blog is here for all my girlies that remember what technology was
        and what the world could have been...
      </p>
      <div className="h-screen">
        <PreviewCard />
      </div>
      <div className="flex">
        <VisitorCounter />
      </div>
    </div>
  );
}
