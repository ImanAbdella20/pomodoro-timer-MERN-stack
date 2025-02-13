import React, { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { Navigate, useNavigate } from 'react-router';

const Setting = () => {
  const {
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
  } = useTimer();

  // Timer Settings
  const [pomodoro, setPomodoro] = useState(sessionLength); // Pomodoro time in minutes
  const [shortBreak, setShortBreak] = useState(shortBreakLength); // Short break time in minutes
  const [longBreak, setLongBreak] = useState(longBreakLength); // Long break time in minutes
  const [longBreakInterval, setLongBreakInterval] = useState(4); // Long break interval

  // Task Settings
  const [autoCheckTasksSetting, setAutoCheckTasks] = useState(autoCheckTasks);
  const [autoSwitchTasksSetting, setAutoSwitchTasks] = useState(autoSwitchTasks);

  // Sound Settings
  const [alarmSoundSetting, setAlarmSound] = useState(alarmSound); // Alarm sound volume (0-100)

  // Theme Settings
  const [colorThemeSetting, setColorTheme] = useState(colorTheme); // 'light' or 'dark'
  const [hourFormatSetting, setHourFormat] = useState(hourFormat); // '12' or '24'
  const [darkModeWhenRunningSetting, setDarkModeWhenRunning] = useState(darkModeWhenRunning);
  const [smallWindowSetting, setSmallWindow] = useState(smallWindow);

  // Notification Settings
  const [reminderTimeSetting, setReminderTime] = useState(reminderTime); // Reminder time in minutes
  const [mobileAlarmSetting, setMobileAlarm] = useState(mobileAlarm); // Mobile alarm setting

  // Integration Settings
  const [todoistConnectedSetting, setTodoistConnected] = useState(todoistConnected); // Todoist integration
  const [webhookSetting, setWebhook] = useState(webhook); // Webhook URL
  const navigate = useNavigate();

  const colors = ['#ffffff', '#000000', '#ff5733', '#33ff57', '#3357ff', '#ff33a8'];

  const handlePomodoroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPomodoro = Number(e.target.value);
    setPomodoro(newPomodoro);
    updateTimerSettings('session', newPomodoro);
  };

  const handleShortBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newShortBreak = Number(e.target.value);
    setShortBreak(newShortBreak);
    updateTimerSettings('shortBreak', newShortBreak);
  };

  const handleLongBreakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLongBreak = Number(e.target.value);
    setLongBreak(newLongBreak);
    updateTimerSettings('longBreak', newLongBreak);
  };

  const handleAutoStartBreaksChange = () => {
    setAutoCheckTasks(!autoStartBreaks);
    updateTimerSettings('autoStartBreaks', !autoStartBreaks);
  };

  const handleAutoStartPomodorosChange = () => {
    setAutoSwitchTasks(!autoStartPomodoros);
    updateTimerSettings('autoStartPomodoros', !autoStartPomodoros);
  };

  const handleAutoCheckTasksChange = () => {
    setAutoCheckTasks(!autoCheckTasksSetting);
    updateTimerSettings('autoCheckTasks', !autoCheckTasksSetting);
  };

  const handleAutoSwitchTasksChange = () => {
    setAutoSwitchTasks(!autoSwitchTasksSetting);
    updateTimerSettings('autoSwitchTasks', !autoSwitchTasksSetting);
  };

  const handleAlarmSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlarmSound = Number(e.target.value);
    setAlarmSound(newAlarmSound);
    updateTimerSettings('alarmSound', newAlarmSound);
  };

  const handleColorThemeChange = (color: string) => {
    setColorTheme(color);
    updateTimerSettings('colorTheme', color);
  };

  const handleHourFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHourFormat(e.target.value);
    updateTimerSettings('hourFormat', e.target.value);
  };

  const handleDarkModeChange = () => {
    setDarkModeWhenRunning(!darkModeWhenRunning);
    updateTimerSettings('darkModeWhenRunning', !darkModeWhenRunning);
  };

  const handleSmallWindowChange = () => {
    setSmallWindow(!smallWindow);
    updateTimerSettings('smallWindow', !smallWindow);
  };

  const handleReminderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReminderTime(Number(e.target.value));
    updateTimerSettings('reminderTime', Number(e.target.value));
  };

  const handleMobileAlarmChange = () => {
    setMobileAlarm(!mobileAlarm);
    updateTimerSettings('mobileAlarm', !mobileAlarm);
  };

  const handleTodoistConnectedChange = () => {
    setTodoistConnected(!todoistConnected);
    updateTimerSettings('todoistConnected', !todoistConnected);
  };

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhook(e.target.value);
    updateTimerSettings('webhook', e.target.value);
  };

  const handleSaveSettings = () => {
    // Call the updateTimerSettings method for each setting if necessary.
    updateTimerSettings('session', pomodoro);
    updateTimerSettings('shortBreak', shortBreak);
    updateTimerSettings('longBreak', longBreak);
    updateTimerSettings('longBreakInterval', longBreakInterval);
    updateTimerSettings('autoStartBreaks', autoStartBreaks);
    updateTimerSettings('autoStartPomodoros', autoStartPomodoros);
    updateTimerSettings('autoCheckTasks', autoCheckTasksSetting);
    updateTimerSettings('autoSwitchTasks', autoSwitchTasksSetting);
    updateTimerSettings('alarmSound', alarmSoundSetting);
    updateTimerSettings('colorTheme', colorThemeSetting);
    updateTimerSettings('hourFormat', hourFormatSetting);
    updateTimerSettings('darkModeWhenRunning', darkModeWhenRunningSetting);
    updateTimerSettings('smallWindow', smallWindowSetting);
    updateTimerSettings('reminderTime', reminderTimeSetting);
    updateTimerSettings('mobileAlarm', mobileAlarmSetting);
    updateTimerSettings('todoistConnected', todoistConnectedSetting);
    updateTimerSettings('webhook', webhookSetting);

    alert("Settings saved!");
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-2/3 max-w-96 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-7">Settings</h1>

        {/* Timer Settings */}
        <h2 className="font-semibold text-lg">Timer Settings (minutes)</h2>
        <div className="mb-4 flex mt-4">
          <label className="block mb-2">
            Pomodoro:
            <input
              type="number"
              value={pomodoro}
              onChange={handlePomodoroChange}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>
          <label className="block mb-2">
            Short Break:
            <input
              type="number"
              value={shortBreak}
              onChange={handleShortBreakChange}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>

          <label className="block mb-2">
            Long Break:
            <input
              type="number"
              value={longBreak}
              onChange={handleLongBreakChange}
              className="ml-2 p-1 border rounded w-28"
            />
          </label>
        </div>

        {/* Long Break Interval */}
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
        </div>

        {/* Auto Start Settings */}
        <div>
          <label className="block mb-2 relative">
            Auto Start Breaks:
            <input
              type="checkbox"
              checked={autoStartBreaks}
              onChange={handleAutoStartBreaksChange}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-2 relative">
            Auto Start Pomodoros:
            <input
              type="checkbox"
              checked={autoStartPomodoros}
              onChange={handleAutoStartPomodorosChange}
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
              checked={autoCheckTasksSetting}
              onChange={handleAutoCheckTasksChange}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-2 relative">
            Auto Switch Tasks:
            <input
              type="checkbox"
              checked={autoSwitchTasksSetting}
              onChange={handleAutoSwitchTasksChange}
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
              value={alarmSoundSetting}
              onChange={handleAlarmSoundChange}
              className="ml-2 absolute right-0"
            />
          </label>
        </div>

        {/* Theme Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Theme Settings</h2>
          <label className="block mb-2">Color Theme:</label>
          <div className="flex space-x-2">
            {colors.map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded cursor-pointer border-2 ${
                  colorThemeSetting === color ? 'border-black' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorThemeChange(color)}
              />
            ))}
          </div>

          <label className="block mb-2 relative">
            Hour Format:
            <select
              value={hourFormatSetting}
              onChange={handleHourFormatChange}
              className="ml-2 p-1 border rounded absolute right-0"
            >
              <option value="12">12-Hour</option>
              <option value="24">24-Hour</option>
            </select>
          </label>

          <label className="block mb-2 relative">
            Dark Mode when Running:
            <input
              type="checkbox"
              checked={darkModeWhenRunningSetting}
              onChange={handleDarkModeChange}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-4 relative">
            Small Window:
            <input
              type="checkbox"
              checked={smallWindowSetting}
              onChange={handleSmallWindowChange}
              className="ml-2 absolute right-0"
            />
          </label>
        </div>

        {/* Notification Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Notification Settings</h2>
          <label className="block mb-2 relative">
            Reminder Time (minutes):
            <input
              type="number"
              value={reminderTimeSetting}
              onChange={handleReminderTimeChange}
              className="ml-2 p-1 border rounded w-20 absolute right-0"
            />
          </label>
          <label className="block mb-2 relative">
            Mobile Alarm:
            <input
              type="checkbox"
              checked={mobileAlarmSetting}
              onChange={handleMobileAlarmChange}
              className="ml-2 absolute right-0 mt-2"
            />
          </label>
        </div>

        {/* Integration Settings */}
        <div className="mb-4">
          <h2 className="font-semibold text-lg">Integration Settings</h2>
          <label className="block mb-2 relative">
            Todoist Integration:
            <input
              type="checkbox"
              checked={todoistConnectedSetting}
              onChange={handleTodoistConnectedChange}
              className="ml-2 absolute right-0"
            />
          </label>
          <label className="block mb-2">
            Webhook URL:
            <input
              type="text"
              value={webhookSetting}
              onChange={handleWebhookChange}
              className="ml-2 p-1 border rounded"
            />
          </label>
        </div>

        {/* Save Settings Button */}
        <div className="text-center" onClick={handleSaveSettings}>
          <button className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-800">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
