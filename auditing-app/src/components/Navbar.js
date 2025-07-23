import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/about">About</Link> | 
      <Link to="/services">Services</Link> | 
      <Link to="/contact">Contact</Link> | 
      {!user && <>
        <Link to="/login">Login</Link> | 
        <Link to="/register">Register</Link>
      </>}
      {user && <>
        <Link to="/dashboard">Dashboard</Link> | 
        <button onClick={logout}>Logout</button>
      </>}
    </nav>
  );
}
