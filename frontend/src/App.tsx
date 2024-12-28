import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import Category from './pages/Category/Category';
import Track from './pages/track/TimerComponent';
import TaskComponent from './pages/tasks/TaskComponent';
import { TimerProvider } from './context/TimerContext';
import Statistics from '../src/pages/statstics/Statstics';
import About from './pages/about/About';
import Account from './pages/account/Account';
import Setting from './pages/Setting/Setting';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [initialRedirectHandled, setInitialRedirectHandled] = useState(false); // Add this state
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser && !initialRedirectHandled) {
        localStorage.setItem('authToken', currentUser.uid); // Store auth token
        navigate('/category');
        setInitialRedirectHandled(true); // Update the state
      } else if (!currentUser) {
        localStorage.removeItem('authToken'); // Clear auth token
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, initialRedirectHandled]);

  // Determine whether to hide the header based on the current path
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <TimerProvider>
      <div>
        {!hideHeader && <Header user={user} />}
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path="/category" element={<Category />} />
          <Route path="/setting" element={< Setting/>} />
          <Route path="/account" element={<Account user = {user}/>} />
          <Route
            path="/category/:categoryId/tasks"
            element={user ? <TaskComponent /> : <Navigate to="/login" state={{ from: location }} replace />}
          />
          <Route path="/track" element={<Track />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </TimerProvider>
  );
};

export default App;
