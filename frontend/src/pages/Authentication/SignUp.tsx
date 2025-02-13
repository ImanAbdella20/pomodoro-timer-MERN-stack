import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { onGoogleSignIn } from './googleLogin';
import '@fortawesome/fontawesome-free';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);  // State to track Google sign-in progress
  const navigate = useNavigate();
  const location = useLocation();

  // Get the location to redirect to after a successful Google sign-in
  const from = location.state?.from?.pathname || '/';

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      setError('Passwords do not match');
      return;
    }

    const auth = getAuth();
    try {
      if (!isRegistering) {
        setIsRegistering(true);
        console.log('Firebase sign-up initiated...');

        // Create the user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User created:', user);

        // Get and store the user's ID token correctly
        const idToken = await user.getIdToken();  
        console.log('Firebase ID Token:', idToken);

        // Store the correct token in localStorage
        localStorage.setItem('authToken', idToken);
        console.log('Stored Token:', localStorage.getItem('authToken'));

        // Post user data to your backend
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/signup`, {
          username: userName,
          email: email,
          uid: user.uid,
        });

        console.log('User successfully created and signed up!');
        navigate('/');  // Redirect to dashboard or home page after successful sign-up
      }
    } catch (err: any) {
      console.error('Error signing up:', err);

      // Handle Firebase-specific errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use. Please try another one.');
          break;
        case 'auth/invalid-email':
          setError('The email address is invalid. Please enter a valid email.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please choose a stronger password.');
          break;
        default:
          setError('An unexpected error occurred. Please try again later.');
          break;
      }
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-slate-700 min-h-screen">
      <div className="p-8 max-w-md bg-white rounded-md">
        <h1 className="text-center mb-8 text-black font-sans font-bold text-2xl">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUserName(e.target.value)}
            required
            className="w-full mb-5 h-9 rounded-md pl-3 border border-black"
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-5 h-9 rounded-md pl-3 border border-black"
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-5 h-9 rounded-md pl-3 border border-black"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full mb-5 h-9 rounded-md pl-3 border border-black"
          />
          <button
            type="submit"
            disabled={isRegistering}
            className="bg-slate-700 w-full h-9 rounded-md text-white border border-black"
          >
            Sign Up
          </button>
          <h6 className="font-light m-3 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-slate-700">
              Login here
            </Link>
          </h6>
          <div className="flex">
            <hr className="w-48 mt-3 mb-3" />
            <span className="ml-6 mr-6 mb-3">or</span>
            <hr className="w-48 mt-3" />
          </div>
          <button
            className="bg-slate-700 w-full h-9 rounded-md text-white"
            onClick={(e) => onGoogleSignIn(e, signingIn, setSigningIn, setError, navigate, from)} // Pass navigate and from
            disabled={signingIn}
          >
            <i className="fab fa-google"></i> Login with Google
          </button>
        </form>
        {error && <p className="bg-slate-700">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
