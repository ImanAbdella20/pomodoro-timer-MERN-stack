import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tasks from './TaskForm';
import { FaTasks, FaEdit, FaPlay, FaTrash } from 'react-icons/fa';
import { useTimer } from '../../context/TimerContext';

interface TasksType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
}

const TaskComponent: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { setSelectedTask } = useTimer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('No auth token found');
        }

        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/tasks?categoryId=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    if (categoryId) {
      fetchTasks();
    }
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
    console.log(`Edit task ${taskId}`);
  };

  const handleStart = (task: TasksType) => {
    setSelectedTask(task); 
    navigate('/track'); 
  };

  const handleDelete = (taskId: string) => {
    console.log(`Delete task ${taskId}`);
  };

  return (
    <div className="task-component max-w-lg mx-auto">
      <h1 className="text-center font-bold text-2xl text-white mb-7">My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {showForm && categoryId && (
          <Tasks categoryId={categoryId} onTaskAdded={handleTaskAdded} onClose={toggleClose} />
        )}
        {tasks.length === 0 ? (
          <p className="text-center text-red-500">No tasks added.</p>
        ) : (
          <ul className="task-list grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="task-item bg-opacity-50 p-4 rounded-lg shadow-lg border border-gray-300 relative cursor-pointer"
                onClick={() => handleStart(task)}
              >
                <div className="flex items-center">
                  <FaTasks className="mr-2" />
                  <h2 className="font-bold text-xl text-white">
                    {task.taskName}
                  </h2>
                </div>
                <div className="icons absolute right-2 top-2 flex space-x-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(task._id)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
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
      <button onClick={toggleShowForm} className="pl-14 pr-14 pt-3 pb-3 bg-slate-700 rounded-md text-5xl mt-9">
        {showForm ? 'Hide Form' : '+'}
      </button>
    </div>
  );
};

export default TaskComponent;
