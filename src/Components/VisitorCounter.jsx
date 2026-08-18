import { useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="bg-amber-50 border-3 w-2xl">{count}</div>
      <div className="flex"></div>
    </div>
  );
}
