import React, { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode } from 'react';

// Define the context value type
interface TimerContextType {
  currentUser: any;  // User type can be more specific
  setCurrentUser: Dispatch<SetStateAction<any>>;  // Set user
  selectedTask: TaskType | null;
  setSelectedTask: Dispatch<SetStateAction<TaskType | null>>;

  startTimer: () => void;
  updateTask: (updatedTask: TaskType) => void;

  sessionLength: number;
  shortBreakLength: number;
  longBreakLength: number;

  // Additional settings
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  autoCheckTasks: boolean;
  autoSwitchTasks: boolean;
  alarmSound: number;
  colorTheme: string;
  hourFormat: string;
  darkModeWhenRunning: boolean;
  smallWindow: boolean;
  reminderTime: number;
  mobileAlarm: boolean;
  todoistConnected: boolean;
  webhook: string;

  updateTimerSettings: (type: string, value: any) => void;
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
const TimerContext = createContext<TimerContextType>( {
  currentUser: null,
  setCurrentUser: () => {},
  selectedTask: null,
  setSelectedTask: () => {},
  startTimer: () => {},
  updateTask: () => {},
  
  sessionLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,

  autoStartBreaks: false,
  autoStartPomodoros: false,
  autoCheckTasks: false,
  autoSwitchTasks: false,
  alarmSound: 0,
  colorTheme: 'light',
  hourFormat: '12',
  darkModeWhenRunning: false,
  smallWindow: false,
  reminderTime: 10,
  mobileAlarm: false,
  todoistConnected: false,
  webhook: '',

  updateTimerSettings: () => {},
});

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null); 
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Timer lengths
  const [sessionLength, setSessionLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);

  // Additional settings
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [autoCheckTasks, setAutoCheckTasks] = useState(false);
  const [autoSwitchTasks, setAutoSwitchTasks] = useState(false);
  const [alarmSound, setAlarmSound] = useState(0);
  const [colorTheme, setColorTheme] = useState('light');
  const [hourFormat, setHourFormat] = useState('12');
  const [darkModeWhenRunning, setDarkModeWhenRunning] = useState(false);
  const [smallWindow, setSmallWindow] = useState(false);
  const [reminderTime, setReminderTime] = useState(10);
  const [mobileAlarm, setMobileAlarm] = useState(false);
  const [todoistConnected, setTodoistConnected] = useState(false);
  const [webhook, setWebhook] = useState('');

  const startTimer = () => {
    setIsRunning(true);
  };

  const updateTask = (updatedTask: TaskType) => {
    if (selectedTask?._id === updatedTask._id) {
      setSelectedTask(updatedTask);
    }
  };

  // Updated function to handle all settings
  const updateTimerSettings = (type: string, value: any) => {
    switch (type) {
      case 'session':
        setSessionLength(value);
        break;
      case 'shortBreak':
        setShortBreakLength(value);
        break;
      case 'longBreak':
        setLongBreakLength(value);
        break;
      
      // Task-related settings
      case 'autoStartBreaks':
        setAutoStartBreaks(value);
        break;
      case 'autoStartPomodoros':
        setAutoStartPomodoros(value);
        break;
      case 'autoCheckTasks':
        setAutoCheckTasks(value);
        break;
      case 'autoSwitchTasks':
        setAutoSwitchTasks(value);
        break;

      // Sound-related settings
      case 'alarmSound':
        setAlarmSound(value);
        break;

      // Theme-related settings
      case 'colorTheme':
        setColorTheme(value);
        break;
      case 'hourFormat':
        setHourFormat(value);
        break;
      case 'darkModeWhenRunning':
        setDarkModeWhenRunning(value);
        break;
      case 'smallWindow':
        setSmallWindow(value);
        break;

      // Notification settings
      case 'reminderTime':
        setReminderTime(value);
        break;
      case 'mobileAlarm':
        setMobileAlarm(value);
        break;

      // Integration settings
      case 'todoistConnected':
        setTodoistConnected(value);
        break;
      case 'webhook':
        setWebhook(value);
        break;

      default:
        console.error(`Unknown setting type: ${type}`);
    }
  };

  return (
    <TimerContext.Provider value={{
      currentUser,
      setCurrentUser,
      selectedTask,
      setSelectedTask,
      startTimer,
      updateTask,
      
      sessionLength,
      shortBreakLength,
      longBreakLength,
      
      autoStartBreaks,
      autoStartPomodoros,
      autoCheckTasks,
      autoSwitchTasks,
      alarmSound,
      colorTheme,
      hourFormat,
      darkModeWhenRunning,
      smallWindow,
      reminderTime,
      mobileAlarm,
      todoistConnected,
      webhook,

      updateTimerSettings,
    }}>
      {children}
    </TimerContext.Provider>
  );
};

// Custom hook to use the Timer context
export const useTimer = () => useContext(TimerContext);
