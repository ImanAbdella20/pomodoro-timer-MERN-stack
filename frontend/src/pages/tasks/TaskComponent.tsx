import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Tasks from './TaskForm';
import { FaTasks , FaEdit , FaTrash , FaPause , FaPlay} from 'react-icons/fa';


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

  return (
    <div>
      <h1 className='text-center font-bold text-2xl text-white'>My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
    <div >
    {showForm && categoryId && (
        <Tasks categoryId={categoryId} onTaskAdded={handleTaskAdded} onClose={toggleClose} />
      )}
      <ul className='flex flex-wrap'>
        {tasks.map((task) => (   
          <li key={task._id} className='border p-3 w-2/4 m-6 shadow-md rounded-md flex justify-between items-center text-white cursor-pointer'>
            <FaTasks/>
            <h2>{task.taskName}</h2>
            <button>
              <FaEdit className='text-green-900'/>
            </button>
            <button>
              <FaPause/>
            </button>
            <button>
              <FaTrash className='text-red-700'/>
            </button>
          </li>
        ))}
      </ul>
    </div>
     
      <button onClick={toggleShowForm} className='pl-14 pr-14 pt-3 pb-3 bg-slate-700 rounded-md text-5xl'>
        {showForm ? 'Hide Form' : '+'}
      </button>
    </div>
  );
};

export default TaskComponent;
