import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebaseConfig';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import { doc, getDoc } from "firebase/firestore";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        localStorage.setItem("authToken", currentUser.uid);

        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({ ...currentUser, ...userData }); // Merge Firestore data with Firebase auth user
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
        localStorage.removeItem("authToken");
      }
    });

    return () => unsubscribe();
  }, []);

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
