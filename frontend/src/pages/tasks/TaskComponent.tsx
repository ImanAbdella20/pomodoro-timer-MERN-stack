import axios from 'axios';
import  {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Tasks from './TaskForm'

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
    const { categoryId } = useParams<{categoryId:string}>();
    const [tasks, setTasks] = useState<TasksType[]>([]); 
    const [error, setError] = useState(null) 
    const [showForm , setShowForm] = useState(false);

    useEffect(() => {
        const fetchTasks = async ()=> {
try {
    const authToken = localStorage.get('authToken');
    if(!authToken){
        throw new Error('No auth token found');
    }
     const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/tasks?category=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

    setTasks(response.data);
} catch (error) {
    console.error('Error fetching categories', error);
}
        }
        fetchTasks();
    }, [categoryId])

    const handleTaskAdded = (newTask: TasksType) => {
      setTasks([...tasks,newTask]);
      setShowForm(false)
    }

    const toggleShowForm = () => {
      setShowForm(!showForm)
    }

    return ( 
    
    <div> <h1>My Tasks</h1> 
    {error && <p className="text-red-500">{error}</p>} 
    <button onClick={toggleShowForm}>
      {showForm ? 'Hide Form' : '+'}
    </button>
    {showForm && categoryId && <Tasks categoryId={categoryId} onTaskAdded={handleTaskAdded} />}
    <ul> 
      {tasks.map((task) => ( 
        <li key={task._id}> 
        <h2>{task.taskName}</h2>
        <p>Status: {task.status}</p> 
        <p>Priority: {task.priority}</p> 
        <p>Estimated Pomodoros: {task.estimatedPomodoros}</p> 
        <p>Short Break: {task.shortBreak} mins</p> 
        <p>Long Break: {task.longBreak} mins</p> 
        </li> ))} 
        </ul> 
        </div>
         );
}

export default TaskComponent