import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebaseConfig';
import { doSignOut } from './firebase/auth';
import { RouterProvider } from 'react-router-dom';
import router from './components/route/route';

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
          <p>Welcome, {user.email}</p>
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
