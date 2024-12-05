import { useState } from 'react';
import axios from 'axios';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { Link } from 'react-router-dom';
import { onGoogleSignIn } from './googleLogin';
import '@fortawesome/fontawesome-free';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

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
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/signup`, { 
          username: userName,
          email: email,
          uid: user.uid
        });
        console.log('User Successfully Created!');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className='flex justify-center items-center bg-customGreen min-h-screen'>
      <div className='p-8 max-w-md bg-white rounded-md'>
        <h1 className='text-center mb-8 text-black font-sans font-bold text-2xl'>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder='Enter Username'
            onChange={(e) => setUserName(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <input
            type="email"
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <input
            type="password"
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <input
            type="password"
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <button 
            type="submit" 
            disabled={isRegistering} 
            className='bg-customGreen w-full h-9 rounded-md text-white border border-black'
          >
            Sign Up
          </button>
          <h6 className='font-light m-3 text-sm'>Already have an account? <Link to="/login" className='text-customGreen'>Login here</Link></h6>
          <div className='flex'>
            <hr className='w-48 mt-3 mb-3' /> 
            <span className='ml-6 mr-6 mb-3'>or</span> 
            <hr className='w-48 mt-3' />
          </div>
          <button
            className='bg-customGreen w-full h-9 rounded-md text-white'
            onClick={(e) => onGoogleSignIn(e, isRegistering, setIsRegistering, setError)}
          > 
            <i className='fab fa-google'></i> Login with Google
          </button>
        </form>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
