import mongoose from 'mongoose';

const taskModel = mongoose.Schema({

    tasks:{
        type:String,
        required:true
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

export const Tasks = mongoose.model("Tasks" , taskModel);