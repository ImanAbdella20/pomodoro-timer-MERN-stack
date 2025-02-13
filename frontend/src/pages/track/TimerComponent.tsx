import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaMinus, FaPlus } from 'react-icons/fa';
import { useTimer } from '../../context/TimerContext';

const TimerComponent: React.FC = () => {
  const { selectedTask, updateTask, currentUser } = useTimer(); // Access global task state and current user

  // Retrieve stored states from localStorage
  const [timeLeft, setTimeLeft] = useState(() => Number(localStorage.getItem('timeLeft')) || 1500);
  const [isRunning, setIsRunning] = useState(() => localStorage.getItem('isRunning') === 'true');
  const [isBreak, setIsBreak] = useState(() => localStorage.getItem('isBreak') === 'true');
  const [sessionLength, setSessionLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [pomodoroStatus, setPomodoroStatus] = useState('Session');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Store user data in localStorage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      // Use this to set user state in TimerContext or perform necessary actions
    }
  }, []);

  // Reset timer when the user logs out
  useEffect(() => {
    if (!currentUser) {
      resetTimer();
    }
  }, [currentUser]);

  // Run timer logic and store states in localStorage whenever they change
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            handleSessionEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearIntervalTimer();
    }

    localStorage.setItem('timeLeft', timeLeft.toString());
    localStorage.setItem('isRunning', isRunning.toString());
    localStorage.setItem('isBreak', isBreak.toString());

    return () => clearIntervalTimer();
  }, [isRunning, timeLeft, isBreak]);

  // Retrieve stored states on mount
  useEffect(() => {
    setTimeLeft(Number(localStorage.getItem('timeLeft')) || 1500);
    setIsRunning(localStorage.getItem('isRunning') === 'true');
    setIsBreak(localStorage.getItem('isBreak') === 'true');
  }, []);

  const clearIntervalTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(sessionLength * 60); // Reset to session length
    setPomodoroStatus('Session');
  };

  const handleSessionEnd = () => {
    if (isBreak) {
      startNewSession();
    } else {
      completePomodoroSession();
    }
  };

  const startNewSession = () => {
    setPomodoroStatus('Session');
    setTimeLeft(sessionLength * 60);
    setIsBreak(false);
    setIsRunning(true);
  };

  const completePomodoroSession = () => {
    if (selectedTask) {
      const updatedPomodoros = (selectedTask?.actualPomodoros ?? 0) + 1;
      updateTask({ ...selectedTask, actualPomodoros: updatedPomodoros });

      sendMessage(`Pomodoro completed! (${updatedPomodoros}/${selectedTask?.estimatedPomodoros ?? 0})`);

      if (updatedPomodoros >= (selectedTask?.estimatedPomodoros ?? 0)) {
        showNotification();
      }
    }

    if ((selectedTask?.actualPomodoros ?? 0) % 4 === 0) {
      setPomodoroStatus('Long Break');
      setTimeLeft(longBreakLength * 60);
    } else {
      setPomodoroStatus('Break');
      setTimeLeft(shortBreakLength * 60);
    }
    setIsBreak(true);
    setIsRunning(true);
  };

  const handleStartPause = () => setIsRunning(!isRunning);

  const handleReset = () => {
    resetTimer();
  };

  const handleLengthChange = (type: 'session' | 'shortBreak' | 'longBreak', amount: number) => {
    if (type === 'session') {
      setSessionLength((prev) => Math.max(1, prev + amount));
      if (!isBreak && !isRunning) setTimeLeft(Math.max(1, (sessionLength + amount) * 60));
    } else if (type === 'shortBreak') {
      setShortBreakLength((prev) => Math.max(1, prev + amount));
    } else if (type === 'longBreak') {
      setLongBreakLength((prev) => Math.max(1, prev + amount));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const sendMessage = (message: string) => {
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Update', { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Pomodoro Update', { body: message });
        }
      });
    } else {
      alert(message);
    }
  };

  const showNotification = () => {
    sendMessage(`🎉 All ${selectedTask?.estimatedPomodoros ?? 0} Pomodoros completed for "${selectedTask?.taskName}"!`);
  };

  return (
    <div className="timer-component flex flex-col items-center justify-center bg-slate-700 h-screen">
      <h1 className="text-2xl font-bold mb-4">{selectedTask ? selectedTask.taskName : 'No Task Selected'}</h1>
      <div className="pomodoro-status text-lg font-semibold mb-4">{pomodoroStatus}</div>

      <div className="circular-progress mb-6">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={`${(1 - timeLeft / ((isBreak ? shortBreakLength : sessionLength) * 60)) * 283}`}
            className="text-red-500"
          />
          <text x="50" y="50" textAnchor="middle" dy=".3em" fontSize="20" className="fill-current text-gray-700">
            {formatTime(timeLeft)}
          </text>
        </svg>
      </div>

      <div className="timer-buttons flex space-x-4 mb-4">
        <button onClick={handleStartPause} className="text-blue-500 hover:text-blue-700">
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleReset} className="text-red-500 hover:text-red-700">
          <FaRedo />
        </button>
      </div>

      <div className="length-controls flex space-x-4">
        {[{ label: 'Session', type: 'session', value: sessionLength }, { label: 'Short Break', type: 'shortBreak', value: shortBreakLength }, { label: 'Long Break', type: 'longBreak', value: longBreakLength }]
          .map(({ label, type, value }) => (
            <div key={type} className="control flex flex-col items-center">
              <div className="font-semibold">{label} Length</div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handleLengthChange(type as any, -1)} className="text-white hover:text-gray-700">
                  <FaMinus />
                </button>
                <span>{value}</span>
                <button onClick={() => handleLengthChange(type as any, 1)} className="text-white hover:text-gray-700">
                  <FaPlus />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TimerComponent