import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebaseConfig';
import { doSignOut } from './firebase/auth';
import { Router, RouterProvider } from 'react-router-dom';
import router from './components/route/route';
import Tasks from './pages/tasks/Tasks';
import Header from './components/header/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>welcome, {user.email}</p>
          <Tasks/>
          <button onClick={() => doSignOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
           <RouterProvider router={ router}/>
        </div>
      )}
    </div>
  );
};

export default App;
