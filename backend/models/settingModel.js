import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
    pomodoro: { 
        type: Number, 
        default: 25 
    },
    shortBreak: { 
        type: Number,
         default: 5 
    },
    longBreak: { 
        type: Number, 
        default: 15 
    },
    longBreakInterval: { 
        type: Number, default: 4 
    },
    autoStartBreaks: { 
        type: Boolean, 
        default: false 
    },
    autoStartPomodoros: { 
        type: Boolean, 
        default: false 
    },
    autoCheckTasks: { 
        type: Boolean, 
        default: false 
    },
    autoSwitchTasks: { 
        type: Boolean, 
        default: false 
    },
    alarmSound: { 
        type: Number, 
        default: 50 
    },
    tickingSound: { 
        type: Number, 
        default: 50 
    },
    colorTheme: { 
        type: String, 
        default: "#ffffff" 
    },
    hourFormat: { 
        type: String, 
        default: "24" 
    },
    darkModeWhenRunning: { 
        type: Boolean, 
        default: false 
    },
    smallWindow: { 
        type: Boolean, 
        default: false 
    },
    reminderTime: { 
        type: Number, 
        default: 5 
    },
    mobileAlarm: {
         type: Boolean,
          default: false
         },
    todoistConnected: { 
        type: Boolean, 
        default: false 
    },
    webhook: { 
        type: String, 
        default: "" 
    },
});

export const Setting = mongoose.model('Setting', SettingSchema);
