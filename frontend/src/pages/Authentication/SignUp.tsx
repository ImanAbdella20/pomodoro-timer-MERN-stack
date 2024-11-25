import { useState} from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../../firebaseConfig'

const SignUp = () => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async(e: React.FormEvent) =>{
    e.preventDefault();
    console.log("Sign up initiated");
    
    try {

      console.log("Creating user");
      const userCredential = createUserWithEmailAndPassword(auth , email , password);
      const user = (await userCredential).user;
      console.log("user created");

      await axios.post('http://localhost:5002/api/signup', {
        username: userName,
        email,
        uid:user.uid
      })

      //redirect
      console.log('User Successfully Created!');
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