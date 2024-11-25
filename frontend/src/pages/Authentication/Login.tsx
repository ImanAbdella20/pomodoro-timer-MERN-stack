import {useState} from 'react';
import axios from 'axios';


const [email , setEmail] = useState ('');
const [password , setPassword] = useState ('');

const handleLogin = async() => {

}

const Login = () => {
  return (
   <form onSubmit={handleLogin}>
    <input
     type="text" 
     placeholder='Enter your email' 
     onChange={(e) =>setEmail (e.target.value)} 
     required
     />
    <input
     type="text" 
     placeholder='Enter your password' 
     onChange={(e) =>setPassword (e.target.value)}
      required
      />

   </form>
  )
}

export default Login;