import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Home() {
  return <h2>Welcome to the Shopify Integration App</h2>;
}

export default function App() {
  return (
    <div>
      {/* Navbar - always visible */}
      <nav style={{ marginBottom: 24 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      {/* Routes change the page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
