import mongoose from 'mongoose';

const taskModel = mongoose.Schema({
    user: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User", 
         required: true 
        }, 
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    }, 
    description: { 
        type: String, 
        required: false 
    },
    status:{
        type:String,
        enum:['pending' , 'in progress', 'completed'],
        default:'pending'
    },
    creationDate:{
        type:String,
        default:Date.now
    },
    dueDate:{
        type:String,
        required:false
    },
    priority:{
        type: String, 
        enum: ['low', 'medium', 'high'], 
        default:'medium'
    },
    estimatedPomodoros:{
        type:String,
        required:false,
        default:0
    },
    shortBreak:{
        type: Number, 
        required: false, 
        default:0
    },
    longBreak: {
        type: Number, 
        required: false, 
        default:0
    }

})

export const Task = mongoose.model("Task" , taskModel);