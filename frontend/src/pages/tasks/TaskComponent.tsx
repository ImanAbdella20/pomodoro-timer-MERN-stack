import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Tasks from './TaskForm';
import { FaRegCircle, FaCheckCircle, FaEllipsisV } from 'react-icons/fa';
import { useTimer } from '../../context/TimerContext';

interface TasksType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
  actualPomodoros?: number;
}

const TaskComponent: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [tasks, setTasks] = useState<TasksType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TasksType | null>(null);
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
          `${import.meta.env.REACT_APP_API_URL}/tasks?category=${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching tasks', error);
        setError('Error fetching tasks');
      }
    };

    if (categoryId) {
      fetchTasks();
    }
  }, [categoryId]);

  const handleTaskAdded = (newTask: TasksType) => {
    // No need for _id generation here, use the one returned from the backend
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setShowForm(false);  // Optionally close the form after adding the task
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleEdit = (task: TasksType) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleStart = (task: TasksType) => {
    setSelectedTask(task);
    navigate('/track');
  };

  const toggleClose = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const toggleTaskCompletion = async (task: TasksType) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
      const updatedTask: TasksType = { ...task, status: updatedStatus };

      // Optimistically update the task status in the state
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? updatedTask : t
        )
      );

      // Send the updated status to the server
      const response = await axios.put(
        `${import.meta.env.REACT_APP_API_URL}/tasks/update/${task._id}`,
        updatedTask,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Update task in the state after server response
      const updatedTaskData: TasksType = response.data;
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTaskData : t))
      );
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }

      // Remove the task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      // Delete the task from the backend
      await axios.delete(`${import.meta.env.REACT_APP_API_URL}/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setTaskToEdit(null); // Reset the editing task if it was being edited
      setShowForm(false);  // Close the form after deletion
    } catch (error) {
      console.error('Error deleting task', error);
      setError('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className=" max-w-lg mx-auto  bg-slate-700 ">
      <h1 className="text-center font-bold text-2xl text-white mb-7">My Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {showForm && categoryId && (
          <Tasks
            categoryId={categoryId}
            onTaskAdded={handleTaskAdded}
            onClose={toggleClose}
            taskToEdit={taskToEdit}
            onDelete={handleDelete}
          />
        )}
        {Array.isArray(tasks) && tasks.length === 0 ? (
          <p className="text-center text-red-500">No tasks added.</p>
        ) : (
          <ul className="task-list grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="task-item bg-opacity-50 p-4 rounded-lg shadow-lg border border-gray-300 relative cursor-pointer"
              >
                <div className="flex items-center">
                  {task.status === 'completed' ? (
                    <FaCheckCircle
                      className="mr-2 cursor-pointer text-red-500"
                      onClick={() => toggleTaskCompletion(task)}
                    />
                  ) : (
                    <FaRegCircle
                      className="mr-2 cursor-pointer"
                      onClick={() => toggleTaskCompletion(task)}
                    />
                  )}
                  <h2
                    className={`font-bold text-xl text-white ${task.status === 'completed' ? 'line-through' : ''}`}
                    onClick={() => handleStart(task)}
                  >
                    {task.taskName}
                  </h2>
                </div>

                <div className="icons absolute right-2 top-2 flex space-x-2">
                  <div className="flex space-x-2">
                    <FaEllipsisV className="mt-4" onClick={() => handleEdit(task)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={toggleShowForm}
        className="pl-14 pr-14 pt-3 pb-3 bg-slate-700 rounded-md text-5xl mt-9"
      >
        {showForm ? 'Hide Form' : '+'}
      </button>
    </div>
  );
};

export default TaskComponent;
