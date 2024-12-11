import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Tasks from './TaskForm';
import { FaTasks, FaEdit, FaPlay, FaPause, FaTrash } from 'react-icons/fa';

interface TasksType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
}

const TaskComponent = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('No auth token found');
        }

        const response = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/tasks/?category=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchTasks();
  }, [categoryId]);

  const handleTaskAdded = (newTask: TasksType) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const toggleClose = () => {
    setShowForm(false);
  };

  const handleEdit = (taskId: string) => {
    // Implement edit functionality
    console.log(`Edit task ${taskId}`);
  };

  const handlePause = (taskId: string) => {
    // Implement pause functionality
    console.log(`Pause task ${taskId}`);
  };

  const handleStart = (taskId: string) => {
    // Implement start functionality
    console.log(`Start task ${taskId}`);
  };

  const handleDelete = (taskId: string) => {
    // Implement delete functionality
    console.log(`Delete task ${taskId}`);
  };

  return (
    <div className="task-component max-w-lg mx-auto">
      <h1 className='text-center font-bold text-2xl text-white mb-7'>My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {showForm && categoryId && (
          <Tasks categoryId={categoryId} onTaskAdded={handleTaskAdded} onClose={toggleClose} />
        )}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks added.</p>
        ) : (
          <ul className="task-list grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <li key={task._id} className="task-item bg-white p-4 rounded-lg shadow-lg border border-gray-300 relative">
                <div className="flex items-center">
                  <FaTasks className="mr-2" />
                  <h2 className="font-bold text-xl text-black">{task.taskName}</h2>
                </div>
                <div className="icons absolute right-2 top-2 flex space-x-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(task._id)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handlePause(task._id)} className="text-yellow-500 hover:text-yellow-700">
                      <FaPause />
                    </button>
                    <button onClick={() => handleStart(task._id)} className="text-green-500 hover:text-green-700">
                      <FaPlay />
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={toggleShowForm} className='pl-14 pr-14 pt-3 pb-3 bg-slate-700 rounded-md text-5xl mt-9'>
        {showForm ? 'Hide Form' : '+'}
      </button>
    </div>
  );
};

export default TaskComponent;
