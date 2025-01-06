import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { doSignInUserWithEmailAndPassword } from '../../firebase/auth';
import { onGoogleSignIn } from './googleLogin';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/category';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signingIn) {
      setSigningIn(true);
      setError('');

      try {
        const userCredential = await doSignInUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken();

        // Store token in local storage
        localStorage.setItem('authToken', idToken);

        // Redirect to the intended page or a default page
        navigate(from, { replace: true });
      } catch (err: any) {
        handleFirebaseError(err);
      } finally {
        setSigningIn(false);
      }
    }
  };

  const handleFirebaseError = (error: any) => {
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          setError('The email address is not valid.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support.');
          break;
          case 'auth/invalid-credential':
            setError('An Invalid Credential');
            break;
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed login attempts. Please try again later.');
          break;  
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
      }
    } else {
      setError('An unknown error occurred. Please try again.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-slate-700 min-h-screen'>
      <div className='p-8 max-w-md bg-white rounded-md'>
        <h1 className='text-center mb-8 text-black font-sans font-bold text-2xl'>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <input
            type="password"
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full mb-5 h-9 rounded-md pl-3 border border-black'
          />
          <button 
            type="submit" 
            disabled={signingIn} 
            className='bg-slate-700 w-full h-9 rounded-md text-white border border-black'
          >
            Sign In
          </button>
          <h6 className='font-light m-3 text-sm'>Don't have an account? <Link to="/signup" className='text-slate-700'>Sign up here</Link></h6>
          <div className='flex'>
            <hr className='w-48 mt-3 mb-3' /> 
            <span className='ml-6 mr-6 mb-3'>or</span> 
            <hr className='w-48 mt-3' />
          </div>
          <button
            className='bg-slate-700 w-full h-9 rounded-md text-white'
            onClick={(e) => onGoogleSignIn(e, signingIn, setSigningIn, setError)}
            disabled={signingIn}
          > 
            <i className='fab fa-google'></i> Login with Google
          </button>
        </form>
        {error && <p className='text-red-500 text-sm mt-3'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;