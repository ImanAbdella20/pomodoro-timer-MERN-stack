import React, { useState } from 'react';
import axios from 'axios';

interface TasksProps {
  categoryId: string;
  onTaskAdded: (task: TasksType) => void;
  onClose: () => void; 
}

interface TasksType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
}

const Tasks: React.FC<TasksProps> = ({ categoryId, onTaskAdded, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('pending');
  const [priority, setPriority] = useState('medium');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(0);
  const [shortBreak, setShortBreak] = useState(0);
  const [longBreak, setLongBreak] = useState(0);
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No auth token found');

      const response = await axios.post(
        `${import.meta.env.REACT_APP_API_URL}/tasks/add`,
        {
          taskName,
          status,
          priority,
          estimatedPomodoros,
          shortBreak,
          longBreak,
          category: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Clear form fields after submission
      setTaskName('');
      setStatus('pending');
      setPriority('medium');
      setEstimatedPomodoros(0);
      setShortBreak(0);
      setLongBreak(0);

      // Notify the parent component about the new task added
      onTaskAdded(response.data);
    } catch (error) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="tasks-overlay">
      <div className="tasks-form bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">Add Your Tasks</h1>
        {error && <p className="text-red-500">{error}</p>}
        <span onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">&times;</span>
        <input
          className="task-input border p-2 rounded mb-2 w-full"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select
          className="task-select border p-2 rounded mb-2 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          className="task-select border p-2 rounded mb-2 w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Estimated Pomodoros"
          value={estimatedPomodoros}
          onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
        />
        <input
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Short Break (minutes)"
          value={shortBreak}
          onChange={(e) => setShortBreak(Number(e.target.value))}
        />
        <input
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Long Break (minutes)"
          value={longBreak}
          onChange={(e) => setLongBreak(Number(e.target.value))}
        />
        <button
          className="task-button bg-slate-700 text-white p-2 rounded mt-2 w-full"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Tasks;
