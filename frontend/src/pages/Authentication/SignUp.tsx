import {useState} from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from ''

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async(e) =>{
    e.preventDefault();
    
    try {
      const userCredential = createUserWithEmailAndPassword(auth , email , password);
      const user = (await userCredential).user;

      await axios.post('http://localhost:5000/api/signup', {
        
      })
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }


  return (
    <>
    <h1>Sign Up </h1>

 <form onSubmit={handleSignUp}>
  <input 
  type="text"
  placeholder='Enter Username'
  onChange={ (e) =>{setUserName(e.target.value)}}
  required
   />

<input 
  type="text"
  placeholder='Enter Email'
  onChange={ (e) =>{setEmail(e.target.value)}}
  required
   />

<input 
  type="text"
  placeholder='Enter Password'
  onChange={ (e) =>{setPassword(e.target.value)}}
  required
   />

   <button>sign up</button>
 </form>
    
    </>
  )
}

export default SignUp