import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate("");
  return (
    <div>
      <div>
        <p>Welcome, Ashley</p>
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
        <button className="aero-btn" onClick={() => {
            navigate("/archive");
          }}>Archive</button>
      </div>
    </div>
  );
}
