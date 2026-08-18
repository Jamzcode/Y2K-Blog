import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex gap-2">
      {" "}
      <button
        className="border-2 hover:cursor-pointer"
        onClick={() => {
          setShowNav((prev) => !prev);
        }}
      >
        |||
      </button>
      {showNav && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/edit">Edit</Link>
          <Link to="/dashboard">Dash</Link>
        </nav>
      )}
    </div>
  );
}
