import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children}){
    const {author, loading} = useAuth();

    if(loading){
        return <p>Loading...</p>;
    }

    if(!author){
        return <Navigate to="/login" replace/>;
    }

    return children;
}