import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User, getRedirectResult } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './pages/Authentication/Login';
import SignUp from './pages/Authentication/SignUp';
import Category from './pages/Category/Category';
import Track from './pages/track/TimerComponent';
import TaskComponent from './pages/tasks/TaskComponent';
import { TimerProvider } from './context/TimerContext';
import Statistics from './pages/statstics/Statstics';
import About from './pages/about/About';
import Account from './pages/account/Account';
import Setting from './pages/Setting/Setting';
import axios from 'axios';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        localStorage.setItem("authToken", currentUser.uid);
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
    });

    // Handle Google login redirect result
    getRedirectResult(auth).then(async (result) => {
      if (result) {
        const user = result.user;
        const idToken = await user.getIdToken();
        localStorage.setItem('authToken', idToken);

        // Send token to backend
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email: user.email, idToken });

        // Redirect to the intended page or a default page
        navigate('/', { replace: true });
      }
    }).catch((error) => {
      console.error('Error during redirect result handling:', error);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Hide header on login/signup pages
  const hideHeader = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <TimerProvider>
      <div>
        {!hideHeader && <Header user={user} />}
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category" element={<Category />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/account" element={<Account user={user} />} />
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
