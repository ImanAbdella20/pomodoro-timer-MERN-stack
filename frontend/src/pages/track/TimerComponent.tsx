import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaRedo, FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios';

interface TaskType {
  _id: string;
  taskName: string;
  status: string;
}

interface TimerComponentProps {
  selectedTask: TaskType | null;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ selectedTask }) => {
  const [timeLeft, setTimeLeft] = useState(1500); // Default session time 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [pomodoroStatus, setPomodoroStatus] = useState('Session');

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
  }, [isRunning, isBreak, breakLength, sessionLength]);

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
  };

  const handleSessionChange = (amount: number) => {
    setSessionLength((prev) => Math.max(1, prev + amount));
    if (!isRunning) {
      setTimeLeft((prev) => Math.max(1, prev + amount) * 60);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (selectedTask) {
      setPomodoroStatus(selectedTask.status);
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
            strokeDashoffset={`${(1 - timeLeft / (isBreak ? breakLength : sessionLength) * 60) * 283}`}
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
            <button onClick={() => handleSessionChange(-1)} className="text-gray-500 hover:text-gray-700">
              <FaMinus />
            </button>
            <span>{sessionLength}</span>
            <button onClick={() => handleSessionChange(1)} className="text-gray-500 hover:text-gray-700">
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="break-control flex flex-col items-center">
          <div className="font-semibold">Break Length</div>
          <div className="flex items-center space-x-2">
            <button onClick={() => handleBreakChange(-1)} className="text-gray-500 hover:text-gray-700">
              <FaMinus />
            </button>
            <span>{breakLength}</span>
            <button onClick={() => handleBreakChange(1)} className="text-gray-500 hover:text-gray-700">
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
