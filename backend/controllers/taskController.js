import { Tasks } from "../models/taskModel.js";

export const addTask = async(req,res) => {

    const { tasks, status, creationDate , priority, estimatedPomodoros , shortBreak , longBreak  } = req.body;
    const newTask = new Tasks({
        tasks, 
        status, 
        creationDate ,
         priority, 
         estimatedPomodoros , 
         shortBreak , 
         longBreak
    })

    try {
        await newTask.save();
        return res.status(200).json({message:"Task created successfully!"})
        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}