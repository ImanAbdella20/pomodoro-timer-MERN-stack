import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { doSignInUserWithEmailAndPassword,doSignInWithGoogle,doSignOut } from '../../firebase/auth';
import axios from 'axios';


const Login = () => {
  const authContext = useAuth();

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { userLoggedIn } = authContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signingIn) {
      setSigningIn(true);
      await doSignInUserWithEmailAndPassword(email, password);
      setSigningIn(false);
    }
  };

  const onGoogleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signingIn) {
      setSigningIn(true);
      try {
        await doSignInWithGoogle();
      } catch (err: unknown) {
        setSigningIn(false);
        if (err instanceof Error) {
          console.error("Google sign-in error:", err.message);
        }
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password" // Changed type to password for better UX
        placeholder='Enter your password'
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={signingIn}>Sign In</button>
      <button onClick={onGoogleSignIn} disabled={signingIn}>Sign In with Google</button>
    </form>
  );
};

export default Login;
