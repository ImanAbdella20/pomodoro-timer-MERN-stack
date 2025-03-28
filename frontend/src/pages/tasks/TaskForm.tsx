import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TasksType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
  dueDate?: string; // Make sure dueDate is optional
}

interface TasksProps {
  categoryId: string;
  onTaskAdded: (task: TasksType) => void;
  onClose: () => void;
  taskToEdit?: TasksType | null; 
  onDelete: (taskId: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ categoryId, onTaskAdded, onClose, taskToEdit, onDelete }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState<'pending' | 'in progress' | 'completed'>('pending');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(0); // Number type for estimatedPomodoros
  const [shortBreak, setShortBreak] = useState(0);
  const [longBreak, setLongBreak] = useState(0);
  const [dueDate, setDueDate] = useState(''); // Add due date field
  const [error, setError] = useState('');

  // Populate form fields if taskToEdit is provided
  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setEstimatedPomodoros(taskToEdit.estimatedPomodoros);
      setShortBreak(taskToEdit.shortBreak);
      setLongBreak(taskToEdit.longBreak);
      setDueDate(taskToEdit.dueDate || ''); // Optional field for due date
    }
  }, [taskToEdit]);

  const handleSubmit = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('No auth token found');

      let response;

      if (taskToEdit) {
        // Update existing task
        response = await axios.put(
          `${import.meta.env.REACT_APP_API_URL}/tasks/update/${taskToEdit._id}`,
          {
            _id: taskToEdit._id, // Ensure _id is included in the update payload
            taskName,
            status,
            priority,
            estimatedPomodoros,
            shortBreak,
            longBreak,
            dueDate,
            category: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        onTaskAdded(response.data); // Notify parent component of updated task
      } else {
        // Create new task
        response = await axios.post(
          `${import.meta.env.REACT_APP_API_URL}/tasks/add`,
          {
            taskName,
            status,
            priority,
            estimatedPomodoros,
            shortBreak,
            longBreak,
            dueDate,
            category: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        onTaskAdded(response.data); // Notify parent component of new task
      }

      // Clear form fields after submission
      setTaskName('');
      setStatus('pending');
      setPriority('medium');
      setEstimatedPomodoros(0);
      setShortBreak(0);
      setLongBreak(0);
      setDueDate('');
      onClose(); // Close the form
    } catch (error) {
      setError('Failed to submit task. Please try again.');
      console.error('Error submitting task:', error);
    }
  };

  const handleDeleteClick = () => {
    if (taskToEdit?._id) {
      onDelete(taskToEdit._id); // Pass the task ID to the onDelete function
    }
  };

  return (
    <div className="tasks-overlay relative z-10">
      <div className="tasks-form bg-white p-6 rounded-lg shadow-lg w-1/3">
        <span
          onClick={onClose}
          className="cursor-pointer text-gray-500 hover:text-gray-700 absolute right-7 text-red-500 font-bold text-xl"
        >
          &times;
        </span>
        <h1 className="text-xl font-bold mb-4">
          {taskToEdit ? 'Edit Task' : 'Add Your Task'}
        </h1>
        <hr />

        {error && <p className="text-red-500">{error}</p>}

        <label htmlFor="taskName" className="block mb-1">
          Task Name:
        </label>
        <input
          id="taskName"
          className="task-input border p-2 rounded mb-2 w-full"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <label htmlFor="priority" className="block mb-1">
          Priority:
        </label>
        <select
          id="priority"
          className="task-select border p-2 rounded mb-2 w-full"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="estimatedPomodoros" className="block mb-1">
          Estimated Pomodoros:
        </label>
        <input
          id="estimatedPomodoros"
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Estimated Pomodoros"
          value={estimatedPomodoros}
          onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
        />

        <label htmlFor="shortBreak" className="block mb-1">
          Short Break:
        </label>
        <input
          id="shortBreak"
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Short Break"
          value={shortBreak}
          onChange={(e) => setShortBreak(Number(e.target.value))}
        />

        <label htmlFor="longBreak" className="block mb-1">
          Long Break:
        </label>
        <input
          id="longBreak"
          className="task-input border p-2 rounded mb-2 w-full"
          type="number"
          placeholder="Long Break"
          value={longBreak}
          onChange={(e) => setLongBreak(Number(e.target.value))}
        />

        <label htmlFor="dueDate" className="block mb-1">
          Due Date:
        </label>
        <input
          id="dueDate"
          className="task-input border p-2 rounded mb-2 w-full"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="flex justify-between mt-4">
          {taskToEdit && (
            <a
              className="text-red-600 cursor-pointer"
              onClick={handleDeleteClick}
            >
              Delete Task
            </a>
          )}
          <button
            className="task-button bg-slate-700 text-white p-2 rounded w-1/3"
            onClick={handleSubmit}
          >
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
