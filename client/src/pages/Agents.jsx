import { useEffect, useState } from 'react';
import { getAgents, deleteAgent } from '../api/agentApi';
import { useAuth } from '../context/AuthContext';
import AgentForm from '../components/AgentForm';

const Agents = () => {
  const { token } = useAuth();
  const [agents, setAgents] = useState([]);
  const [editingAgent, setEditingAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const data = await getAgents(token);
      setAgents(data);
    } catch (err) {
      console.error('Error fetching agents', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      await deleteAgent(id, token);
      fetchAgents();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Agent Management</h2>

      <AgentForm fetchAgents={fetchAgents} editingAgent={editingAgent} setEditingAgent={setEditingAgent} />

      {loading ? (
        <p className="text-center text-gray-500">Loading agents...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="text-center">
                <td className="border border-gray-300 p-2">{agent.name}</td>
                <td className="border border-gray-300 p-2">{agent.email}</td>
                <td className="border border-gray-300 p-2">{agent.mobile}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => setEditingAgent(agent)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Agents;
