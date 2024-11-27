import admin from 'firebase-admin';
import serviceAccount from './pomodoro-timer-6625c-firebase-adminsdk-isbzv-46d8efebf2.json' assert { type: "json"};


admin.initializeApp({ 
    credential: admin.credential.cert(serviceAccount), 
}); 
    export default admin;