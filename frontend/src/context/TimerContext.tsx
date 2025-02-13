import React, { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the context value type
interface TimerContextType {
  currentUser: any;  // User type can be more specific
  setCurrentUser: Dispatch<SetStateAction<any>>;  // Set user
  selectedTask: TaskType | null;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;
  startTimer: () => void;
  updateTask: (updatedTask: TaskType) => void;
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
  actualPomodoros?: number;
}

// Define the TimerProvider props type
interface TimerProviderProps {
  children: ReactNode;
}

// Create the context with default values
const TimerContext = createContext<TimerContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  selectedTask: null,
  setSelectedTask: () => {},
  startTimer: () => {},
  updateTask: () => {},
});

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Track the user
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
  };

  const updateTask = (updatedTask: TaskType) => {
    if (selectedTask?._id === updatedTask._id) {
      setSelectedTask(updatedTask);
    }
  };

  return (
    <TimerContext.Provider value={{ currentUser, setCurrentUser, selectedTask, setSelectedTask, startTimer, updateTask }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the Timer context
export const useTimer = () => useContext(TimerContext);
