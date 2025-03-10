import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Agents from './pages/Agents';

const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
        <Route path="/agents" element={<ProtectedRoute element={<Agents />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    
  );
};

export default AppRouter;
