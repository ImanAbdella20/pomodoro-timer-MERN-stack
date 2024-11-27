import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { doSignInUserWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';
import axios from 'axios';
import api from '../../../axios/axiosInstance'

const Login = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { userLoggedIn } = authContext;

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
        console.log("Id Token:" , idToken);

        // Send token to backend
        await axios.post('http://localhost:5009/api/login', { email, idToken });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signingIn) {
      setSigningIn(true);

      try {
        const userCredential = await doSignInWithGoogle();
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        console.log("Id Token:" , idToken);
        

        // Send token to backend
        await axios.post('http://localhost:5009/api/login', { email: user.email, idToken });
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
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder='Enter your password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={signingIn}>Sign In</button>
      <button onClick={onGoogleSignIn} disabled={signingIn}>Sign In with Google</button>
    </form>
  );
};

export default Login;
