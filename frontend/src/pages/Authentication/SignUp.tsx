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
        await axios.post('http://localhost:5002/api/signup', { 
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder='Enter Username'
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isRegistering}>Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
