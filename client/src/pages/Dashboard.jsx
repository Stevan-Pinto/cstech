import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!token) {
      navigate('/login'); // ✅ Ensures redirect after logout
    }
  }, [token, navigate]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/agents"
                className={`block p-2 rounded ${
                  location.pathname === '/agents' ? 'bg-blue-500' : ''
                }`}
              >
                Manage Agents
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"  // ✅ Fixed path
                className={`block p-2 rounded ${
                  location.pathname === '/tasks' ? 'bg-blue-500' : ''
                }`}
              >
                CSV Upload & Task Distribution
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Welcome to Admin Dashboard</h1>
      </main>
    </div>
  );
};

export default Dashboard;
