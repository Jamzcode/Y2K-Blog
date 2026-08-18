import { useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <p className="">Visitors since y2k</p>
        <div className="bg-amber-50 border-3 w-2xl text-center">{count}</div>
      </div>
    </div>
  );
}
