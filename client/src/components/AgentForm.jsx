import { useState, useEffect } from 'react';
import { addAgent, updateAgent } from '../api/agentApi';
import { useAuth } from '../context/AuthContext';

const AgentForm = ({ fetchAgents, editingAgent, setEditingAgent }) => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (editingAgent) {
      setName(editingAgent.name);
      setEmail(editingAgent.email);
      setMobile(editingAgent.mobile);
      setPassword('');
    }
  }, [editingAgent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const agentData = { name, email, mobile, password };
    
    if (editingAgent) {
      await updateAgent(editingAgent._id, agentData, token);
    } else {
      await addAgent(agentData, token);
    }

    fetchAgents();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setPassword('');
    setEditingAgent(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingAgent ? 'Edit Agent' : 'Add Agent'}</h3>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingAgent} />
      <button type="submit">{editingAgent ? 'Update' : 'Add'}</button>
      {editingAgent && <button type="button" onClick={resetForm}>Cancel</button>}
    </form>
  );
};

export default AgentForm;
