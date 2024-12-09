import axios from 'axios';
import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router'

const TaskComponent = () => {
    const { categoryId } = useParams<{categoryId:string}>();
    const [tasks, setTasks] = useState([]); 
    const [error, setError] = useState(null) 

    useEffect(() => {
        const fetchCategories = async ()=> {
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
    }, [categoryId])

  return (
    <div>
        <h1>My Tasks</h1>

    </div>
  )
}

export default TaskComponent