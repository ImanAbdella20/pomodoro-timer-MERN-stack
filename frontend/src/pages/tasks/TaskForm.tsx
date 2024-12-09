import React, { useState } from 'react'
import axios from 'axios';
const Tasks = () => {

  const [ taskName , setTaskName ] = useState('')
  const [status, setStatus] = useState('pending'); 
  const [priority, setPriority] = useState('medium'); 
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(0); 
  const [shortBreak, setShortBreak] = useState(0); 
  const [longBreak, setLongBreak] = useState(0); 
  const [error, setError] = useState('');

  const handleClick = async()=> {
const authToken = localStorage.getItem('authToken');
if(!authToken){
  throw new Error('No auth token found');
}

await axios.post()
  }
  return (
    <div>
 <h1>Add Your Tasks</h1>
 <input 
 type="text" 
 placeholder='my task'

 />
 
 <button onClick={handleClick}>+</button>
 
    </div>
  )
}

export default Tasks;