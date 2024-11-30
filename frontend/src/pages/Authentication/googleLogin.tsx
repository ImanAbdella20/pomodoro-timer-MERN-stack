import axios from "axios";
import { doSignInWithGoogle } from "../../firebase/auth";


export const onGoogleSignIn = async (
    e: React.FormEvent,
    signingIn:boolean, 
    setSigningIn:React.Dispatch<React.SetStateAction<boolean>>,
    setError:React.Dispatch<React.SetStateAction<string>>,
) => {
    e.preventDefault();

    if (!signingIn) {
      setSigningIn(true);

      try {
        const userCredential = await doSignInWithGoogle();
        const user = userCredential.user;
        const idToken = await user.getIdToken();
        console.log("Id Token:" , idToken);
        

        // Send token to backend
        await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { email: user.email, idToken });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setSigningIn(false);
      }
    }
  };