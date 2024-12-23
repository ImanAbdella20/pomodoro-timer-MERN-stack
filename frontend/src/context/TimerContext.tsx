// TimerContext.tsx
import React, { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the context value type
interface TimerContextType {
  selectedTask: TaskType | null;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
  startTimer: () => void;
}

// Define the TaskType interface
interface TaskType {
  _id: string;
  taskName: string;
  status: 'pending' | 'in progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  estimatedPomodoros: number;
  shortBreak: number;
  longBreak: number;
}

// Define the TimerProvider props type
interface TimerProviderProps {
  children: ReactNode;
}

// Create the context with default values
const TimerContext = createContext<TimerContextType>({
  selectedTask: null,
  setSelectedTask: () => {},
  startTimer: () => {}
});

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isRunning , setIsRunning] = useState(false);

  const startTimer = () => { 
    setIsRunning(true);
  };
  return (
    <TimerContext.Provider value={{ selectedTask, setSelectedTask , startTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
