import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAuthor(data);
        } else {
          setAuthor(null);
        }
      } catch (err) {
        console.error(err);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ author, setAuthor, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
