import { Link } from "react-router-dom";


export default function NavigationBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/edit">Edit</Link>
      <Link to="/dashboard">Dash</Link>
    </nav>
  );
}
