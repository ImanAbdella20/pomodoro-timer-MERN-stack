import React, { useState } from 'react';

const Setting = () => {
  // Timer Settings
  const [pomodoro, setPomodoro] = useState(25); // Pomodoro time in minutes
  const [shortBreak, setShortBreak] = useState(5); // Short break time in minutes
  const [longBreak, setLongBreak] = useState(15); // Long break time in minutes
  const [longBreakInterval, setLongBreakInterval] = useState(4); // Long break interval
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);

  // Task Settings
  const [autoCheckTasks, setAutoCheckTasks] = useState(false);
  const [autoSwitchTasks, setAutoSwitchTasks] = useState(false);

  // Sound Settings
  const [alarmSound, setAlarmSound] = useState(50); // Alarm sound volume (0-100)
  const [tickingSound, setTickingSound] = useState(50); // Ticking sound volume (0-100)

  // Theme Settings
  const [colorTheme, setColorTheme] = useState('#ffffff'); // 'light' or 'dark'
  const [hourFormat, setHourFormat] = useState('24'); // '12' or '24'
  const [darkModeWhenRunning, setDarkModeWhenRunning] = useState(false);
  const [smallWindow, setSmallWindow] = useState(false);

  // Notification Settings
  const [reminderTime, setReminderTime] = useState(5); // Reminder time in minutes
  const [mobileAlarm, setMobileAlarm] = useState(false); // Mobile alarm setting

  // Integration Settings
  const [todoistConnected, setTodoistConnected] = useState(false); // Todoist integration
  const [webhook, setWebhook] = useState(''); // Webhook URL

  const colors = ['#ffffff', '#000000', '#ff5733', '#33ff57', '#3357ff', '#ff33a8'];
  return (
    <div className="flex justify-center items-center min-h-screen  bg-slate-700">
      <div className="w-2/3 max-w-96 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-7">Settings</h1>

        {/* Timer Settings */}
        <h2 className="font-semibold text-lg">Timer Settings( minutes )</h2>
        <div className="mb-4 flex mt-4">
          <label className="block mb-2">
            Pomodoro:
            <input
              type="number"
              value={pomodoro}
              onChange={(e) => setPomodoro(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>
          <label className="block mb-2">
            Short Break:
            <input
              type="number"
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>

          <label className="block mb-2">
            Long Break:
            <input
              type="number"
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>

        </div>

        <div>
          <label className="block mb-2">
            Long Break Interval:
            <input
              type="number"
              value={longBreakInterval}
              onChange={(e) => setLongBreakInterval(Number(e.target.value))}
              className="ml-2 p-1 border rounded"
            />
          </label>
          <label className="block mb-2 relative">
            Auto Start Breaks:
            <input
              type="checkbox"
              checked={autoStartBreaks}
              onChange={() => setAutoStartBreaks(!autoStartBreaks)}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-4 relative">
            Auto Start Pomodoros:
            <input
              type="checkbox"
              checked={autoStartPomodoros}
              onChange={() => setAutoStartPomodoros(!autoStartPomodoros)}
              className="ml-2 absolute right-0"
            />
          </label>
        </div>

        {/* Task Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Task Settings</h2>
          <label className="block mb-2 relative">
            Auto Check Tasks:
            <input
              type="checkbox"
              checked={autoCheckTasks}
              onChange={() => setAutoCheckTasks(!autoCheckTasks)}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-2 relative">
            Auto Switch Tasks:
            <input
              type="checkbox"
              checked={autoSwitchTasks}
              onChange={() => setAutoSwitchTasks(!autoSwitchTasks)}
              className="ml-2 absolute right-0"
            />
          </label>
        </div>

        {/* Sound Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Sound Settings</h2>
          <label className="block mb-2 relative">
            Alarm Sound Volume:
            <input
              type="range"
              min="0"
              max="100"
              value={alarmSound}
              onChange={(e) => setAlarmSound(Number(e.target.value))}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-2 relative">
            Ticking Sound Volume:
            <input
              type="range"
              min="0"
              max="100"
              value={tickingSound}
              onChange={(e) => setTickingSound(Number(e.target.value))}
              className="ml-2 absolute right-0"
            />
          </label>
        </div>

        {/* Theme Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Theme Settings</h2>
          <div className='flex'>
          <label className="block mb-2">Color Theme:</label>
          <div className='flex'>
            {colors.map((color) => (
              <div
              key={color}
              className={`w-8 h-8 rounded cursor-pointer border-2 ${colorTheme === color ? 'border-black' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
              onClick={() => setColorTheme(color)}
              />

              
            ))}
          </div>
          </div>
          <label className="block mb-2">
            Hour Format:
            <select
              value={hourFormat}
              onChange={(e) => setHourFormat(e.target.value)}
              className="ml-2 p-1 border rounded"
            >
              <option value="12">12-Hour</option>
              <option value="24">24-Hour</option>
            </select>
          </label>
          <label className="block mb-2">
            Dark Mode when Running:
            <input
              type="checkbox"
              checked={darkModeWhenRunning}
              onChange={() => setDarkModeWhenRunning(!darkModeWhenRunning)}
              className="ml-2"
            />
          </label>
          <label className="block mb-4">
            Small Window:
            <input
              type="checkbox"
              checked={smallWindow}
              onChange={() => setSmallWindow(!smallWindow)}
              className="ml-2"
            />
          </label>
        </div>

        {/* Notification Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Notification Settings</h2>
          <label className="block mb-2">
            Reminder Time (minutes):
            <input
              type="number"
              value={reminderTime}
              onChange={(e) => setReminderTime(Number(e.target.value))}
              className="ml-2 p-1 border rounded"
            />
          </label>
          <label className="block mb-2">
            Mobile Alarm:
            <input
              type="checkbox"
              checked={mobileAlarm}
              onChange={() => setMobileAlarm(!mobileAlarm)}
              className="ml-2"
            />
          </label>
        </div>

        {/* Integration Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Integration Settings</h2>
          <label className="block mb-2">
            Todoist Integration:
            <input
              type="checkbox"
              checked={todoistConnected}
              onChange={() => setTodoistConnected(!todoistConnected)}
              className="ml-2"
            />
          </label>
          <label className="block mb-2">
            Webhook URL:
            <input
              type="text"
              value={webhook}
              onChange={(e) => setWebhook(e.target.value)}
              className="ml-2 p-1 border rounded"
            />
          </label>
        </div>

        {/* Save Settings Button */}
        <div className="text-center">
          <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800">
           OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
