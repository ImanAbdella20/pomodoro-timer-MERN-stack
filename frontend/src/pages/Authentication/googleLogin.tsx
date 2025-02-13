import axios from "axios";
import { doSignInWithGoogle } from "../../firebase/auth";
import { NavigateFunction } from "react-router-dom";

export const onGoogleSignIn = async (
  e: React.FormEvent,
  signingIn: boolean,
  setSigningIn: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction,
  from: string
) => {
  e.preventDefault();

  // Prevent re-signin while already signing in
  if (!signingIn) {
    setSigningIn(true);
    setError('');  // Reset any previous errors

    try {
      const userCredential = await doSignInWithGoogle();
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      console.log("Google Id Token:", idToken);

      if (idToken && typeof idToken === 'string') {
        // Store the idToken in localStorage for later use
        localStorage.setItem('authToken', idToken);

        // Send token to the backend for server-side validation
        await axios.post(`${import.meta.env.REACT_APP_API_URL}/auth/login`, { 
          email: user.email,
          idToken 
        });

        // Redirect user to the desired page
        navigate(from, { replace: true });
      } else {
        throw new Error("Failed to retrieve valid ID token.");
      }
    } catch (err: any) {
      if (err instanceof Error) {
        // Handle error appropriately
        setError(err.message);
      } else {
        setError('An unknown error occurred during sign-in.');
      }
    } finally {
      setSigningIn(false);  // Reset signingIn state once done
    }
  }
};
