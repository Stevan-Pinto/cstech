import { useEffect, useState } from 'react';
import { getTasks } from '../api/taskApi';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  return (
    <div>
      <h2>Assigned Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.agentName}: {task.taskDetails}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
