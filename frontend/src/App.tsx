import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/firebaseConfig';
import SignUp from './pages/Authentication/SignUp';
import { doSignOut } from './firebase/auth';
import PomodoroTimerPage from './pages/PomodoroTimerPage';

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
          <PomodoroTimerPage/>
          <button onClick={() => doSignOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default App;
