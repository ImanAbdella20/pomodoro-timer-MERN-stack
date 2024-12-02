import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { doSignOut } from './firebase/auth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/header/Header';
import SignUp from './pages/Authentication/SignUp';


const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {user ? (
          <div>
            <Header theme= {theme} setTheme= {setTheme}/>
            <button onClick={() => doSignOut()}>Sign Out</button>
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
