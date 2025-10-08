import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ display: 'flex', gap: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <main style={{ marginTop: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
