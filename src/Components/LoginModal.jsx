import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");

  const handleLogin = async () => {
    const payload = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data.error);
        return;
      }
      
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-2">
      <h1>Welcome Author!</h1>
      <p>Please login to access.</p>
      <label name="email">
        Email: <input className="bg-white" type="email" ref={email} />
      </label>
      <label name="password">
        {" "}
        password: <input className="bg-white" type="password" ref={password} />
      </label>
      <button
        className="aero-btn"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
      
    </div>
  );
}
