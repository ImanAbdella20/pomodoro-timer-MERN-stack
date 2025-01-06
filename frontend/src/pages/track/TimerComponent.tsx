import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaMinus, FaPlus } from 'react-icons/fa';
import { useTimer } from '../../context/TimerContext';

const TimerComponent: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default session time 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [pomodoroStatus, setPomodoroStatus] = useState('Session');
  const { selectedTask, updateTask } = useTimer(); // Assume `updateTask` updates the task in the global state

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (isBreak) {
              setPomodoroStatus('Session');
              setTimeLeft(sessionLength * 60);
              setIsBreak(false);
            } else {
              // Update actualPomodoros when a session ends
              if (selectedTask) {
                const updatedPomodoros = (selectedTask.actualPomodoros || 0) + 1;
                updateTask({
                  ...selectedTask,
                  actualPomodoros: updatedPomodoros,
                });

                // Trigger notification if estimatedPomodoros is reached
                if (updatedPomodoros >= (selectedTask.estimatedPomodoros || 0)) {
                  showNotification();
                }
              }

              setPomodoroStatus('Break');
              setTimeLeft(breakLength * 60);
              setIsBreak(true);
            }
          }
          return prevTime > 0 ? prevTime - 1 : 0;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isBreak, breakLength, sessionLength, selectedTask]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(sessionLength * 60);
    setPomodoroStatus('Session');
  };

  const handleBreakChange = (amount: number) => {
    setBreakLength((prev) => Math.max(1, prev + amount));
    if (isBreak && !isRunning) {
      setTimeLeft((prev) => Math.max(1, breakLength + amount) * 60);
    }
  };

  const handleSessionChange = (amount: number) => {
    setSessionLength((prev) => Math.max(1, prev + amount));
    if (!isBreak && !isRunning) {
      setTimeLeft((prev) => Math.max(1, sessionLength + amount) * 60);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Congratulations!', {
        body: `You have completed all ${selectedTask?.estimatedPomodoros} Pomodoros for "${selectedTask?.taskName}"!`,
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Congratulations!', {
            body: `You have completed all ${selectedTask?.estimatedPomodoros} Pomodoros for "${selectedTask?.taskName}"!`,
          });
        }
      });
    } else {
      alert(`You have completed all ${selectedTask?.estimatedPomodoros} Pomodoros for "${selectedTask?.taskName}"!`);
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setPomodoroStatus('Session');
      setTimeLeft(sessionLength * 60);
      setIsRunning(true); // Start the timer when a task is selected
    }
  }, [selectedTask]);

  return (
    <div className="timer-component flex flex-col items-center justify-center">
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
            strokeDashoffset={`${(1 - timeLeft / ((isBreak ? breakLength : sessionLength) * 60)) * 283}`}
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
        <div className="session-control flex flex-col items-center">
          <div className="font-semibold">Session Length</div>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleSessionChange(-1)} className="text-white hover:text-gray-700">
              <FaMinus />
            </button>
            <span>{sessionLength}</span>
            <button onClick={() => handleSessionChange(1)} className="text-white hover:text-gray-700">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="break-control flex flex-col items-center">
          <div className="font-semibold">Break Length</div>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleBreakChange(-1)} className="text-white hover:text-gray-700">
              <FaMinus />
            </button>
            <span>{breakLength}</span>
            <button onClick={() => handleBreakChange(1)} className="text-white hover:text-gray-700">
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
