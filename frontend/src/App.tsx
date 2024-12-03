import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { doSignOut } from './firebase/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/Header';
import SignUp from './pages/Authentication/SignUp';
import Tasks from './pages/tasks/Tasks';
import Track from './pages/track/Track';
import Category from './pages/Category/Category';


const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // const handleSignOut = async() => {
  //   try {
  //     await doSignOut();
  //     setUser(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log('User signed out successfully');
  // }

  return (
    <Router>
      <div>
        {user ? (
          <div>
            <Header/> 
            <Category/>
           
          </div>
        ) : (
          <div>
            <SignUp/>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
