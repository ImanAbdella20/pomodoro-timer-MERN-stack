import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { doSignInUserWithEmailAndPassword } from '../../firebase/auth';
import axios from 'axios';
import { onGoogleSignIn } from './googleLogin';
import { Link } from 'react-router-dom'; // Ensure you import Link for navigation

const Login = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signingIn) {
      setSigningIn(true);
      setError('');

      try {
        const userCredential = await doSignInUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        console.log("Id Token:", idToken);
        
        //set token to local storage
        localStorage.setItem('authToken', idToken);

        // Send token to backend
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/login`, { email, idToken });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setSigningIn(false);
      }
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-customGreen'>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          type="email"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <button type="submit" disabled={signingIn} className="bg-blue-500 text-white p-2 rounded w-full mb-3">Sign In</button>
        <button onClick={(e) => onGoogleSignIn(e, signingIn, setSigningIn, setError)} disabled={signingIn} className="bg-red-500 text-white p-2 rounded w-full">Sign In with Google</button>
        <p className="mt-3 text-sm">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link></p>
      </form>
    </div>
  );
};

export default Login;
