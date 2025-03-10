import { useEffect, useState } from 'react';
import { getAgents, deleteAgent } from '../api/agentApi';

const AgentList = ({ onEdit }) => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const data = await getAgents();
    setAgents(data);
  };

  const handleDelete = async (id) => {
    await deleteAgent(id);
    fetchAgents(); // Refresh list
  };

  return (
    <div>
      <h2>Agents</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - {agent.email} 
            <button onClick={() => onEdit(agent)}>Edit</button>
            <button onClick={() => handleDelete(agent._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
