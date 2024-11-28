import { useState } from 'react';
import axios from 'axios';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      if (!isRegistering) {
        setIsRegistering(true);
        const userCredential = await doCreateUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        console.log("Sign up initiated");
        await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, { 
          username: userName,
           email:email, 
           uid: user.uid
           });
        console.log('User Successfully Created!');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
    <div className='flex justify-center items-center  bg-customGreen  min-h-screen '>
      <div className='p-8 max-w-md  bg-white rounded-md'>
      <h1 className='text-center mb-8 text-black font-sans font-bold'>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder='Enter Username'
          onChange={(e) => setUserName(e.target.value)}
          required
          className='w-full mb-5 h-9 rounded-md pl-3'
        />
        <input
          type="email"
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          required
           className='w-full mb-5 h-9 rounded-md pl-3'
        />
        <input
          type="password"
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
          required
           className='w-full mb-5 h-9 rounded-md pl-3'
        />
        <input
          type="password"
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
           className='w-full mb-5 h-9 rounded-md pl-3'
        />
        <button 
        type="submit" 
        disabled={isRegistering} 
        className='bg-customGreen w-full h-9 rounded-md text-white'
        >Sign Up</button>

        <h6 className='font-light '>Already have an account?</h6>
<div className='flex '>
<hr className='w-48'/> or <hr className='w-48' />
</div>

<button
className='bg-customGreen w-full h-9 rounded-md text-white'
> 
  Login with Google</button>
      </form>

      </div>
      
    </div> 
    </>
  );
};

export default SignUp;
