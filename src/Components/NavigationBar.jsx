import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavigationBar() {
  const [showNav, setShowNav] = useState(false);
  const { author } = useAuth();

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
          <Link to="/about">About</Link>
          {author ? "logout" : <Link to="/login">Login</Link>}
          {author && <Link to="/edit">Edit</Link>}
          {author && <Link to="/dashboard">Dash</Link>}
        </nav>
      )}
    </div>
  );
}
