import { useEffect, useState } from 'react';
import { getTasks } from '../api/taskApi';
import { useAuth } from '../context/AuthContext';
import CSVUpload from '../components/CSVUpload';

const Tasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []); // Ensure it fetches only on mount

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Task Management</h2>

      {/* CSV Upload Component */}
      <CSVUpload fetchTasks={fetchTasks} />

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading tasks...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Assigned Agent</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="text-center">
                  <td className="border border-gray-300 p-2">{task.firstName}</td> {/* ✅ Fixed task name */}
                  <td className="border border-gray-300 p-2">
                    {task.agent?.name || 'Unassigned'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border border-gray-300 p-4 text-center text-gray-500">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Tasks;
