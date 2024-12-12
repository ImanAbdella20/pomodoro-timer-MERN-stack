import mongoose from "mongoose";


const sessionSchema = mongoose.Schema({
  userId: { 
    type: String, 
    ref: 'User', 
    required: true
 },
  taskId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Task', 
    required: true 
},
  startTime: { 
    type: Date, 
    default: Date.now 
},
  endTime: { 
    type: Date 
},
  status: { 
    type: String, 
    enum: ['active', 'paused', 'completed'], 
    default: 'active' 
},
  duration: { 
    type: Number 
}, // Duration in seconds
});

export const Session = mongoose.model('Session', sessionSchema);
