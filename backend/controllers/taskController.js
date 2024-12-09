import { Task } from "../models/taskModel.js";

export const addTask = async(req,res) => {

    const { taskName, status, creationDate , priority, estimatedPomodoros , shortBreak , longBreak  } = req.body;
    const newTask = new Task({
        user: req.user._id,
        taskName, 
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
        return res.status(400).json({message:error.message});
    }
}

export const updateTask = async(req,res) => {

    const {id} = req.params;
    const { tasks, status, creationDate , priority, estimatedPomodoros , shortBreak , longBreak  } = req.body;

    const  updatedTask   = await Task.findByIdAndUpdate(id , {
        tasks, 
        status, 
        creationDate ,
         priority, 
         estimatedPomodoros , 
         shortBreak , 
         longBreak
    })

    try {
if(!updatedTask){
    return res.status(400).json({message:"No Task found !"})
}

        return res.status(200).json(updatedTask)
        
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}
export const deleteTask = async(req,res) =>{
const { id } = req.params;
    try {
        const deletedTask = Task.findByIdAndDelete(id);
        if(!deletedTask){
            return res.status(400).json({message:"Task not found"})
        } 
        return res.status(200).json({message:"Task deleted successfully!"})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export const getTasksByCategory = async (req, res) => {
    const { category } = req.query;
    try {
      const tasks = await Task.find({ category });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  
