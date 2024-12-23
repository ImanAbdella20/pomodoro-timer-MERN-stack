import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { doSignOut } from './firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import Category from './pages/Category/Category';
import Tasks from './pages/tasks/TaskForm';
import Track from './pages/track/TimerComponent';
import TaskComponent from './pages/tasks/TaskComponent';
import { TimerProvider } from './context/TimerContext';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (

    < TimerProvider>
    <Router>
      <div>
        {user ? (
          <div>
            <Header />
            <button onClick={() => doSignOut()}>Sign Out</button>
            <Routes>
              <Route path="/category" element={<Category />} />
              <Route path="/category/:categoryId/tasks" element={<TaskComponent />} />
              <Route path="/track" element={<Track />} />
              <Route path="*" element={<Navigate to="/category" />}/> 
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />}/>{/* Redirect to login for unauthenticated users */}
          </Routes>
        )}
      </div>
    </Router>
    </TimerProvider>
  );
};

export default App;
