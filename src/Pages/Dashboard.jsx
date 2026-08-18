import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate("");

  useEffect(()=>{
    fetch("http://localhost:3000/api/me", {credentials: "include"})
    .then((res) => res.json())
    .then((data) => setAuthor(data))
    .catch((err) => console.error(err));
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-layout">
      <div>
        {author && <p>Hi {author.username}</p>}
        <p>What would you like to work on?</p>
      </div>
      <div>
        <button
          className="aero-btn"
          onClick={() => {
            navigate("/edit");
          }}
        >
          New+
        </button>
        <button className="aero-btn">Continue Working</button>
        <button
          className="aero-btn"
          onClick={() => {
            navigate("/archive");
          }}
        >
          Archive
        </button>
        <button
          className="aero-btn"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
