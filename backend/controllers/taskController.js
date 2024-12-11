import { Task } from "../models/taskModel.js";
import {Category} from "../models/categoryModel.js"
import mongoose from "mongoose";

export const addTask = async (req, res) => {
  const { taskName, status, priority, estimatedPomodoros, shortBreak, longBreak, category } = req.body;

  console.log('Request Body:', req.body);
  console.log('User:', req.user);
  const categoryId = new mongoose.Types.ObjectId(category);
 const userId = req.user._id;

  const newTask = new Task({
    user:userId,
    taskName,
    status,
    category:categoryId,
    priority,
    estimatedPomodoros,
    shortBreak,
    longBreak
  });

  try {
    await newTask.save();

    const categoryToUpdate = await Category.findById(categoryId); 
    if (categoryToUpdate) {
         if (!Array.isArray(categoryToUpdate.tasks)) {
             categoryToUpdate.tasks = []; 
            } 
        categoryToUpdate.tasks.push(newTask._id); 
        await categoryToUpdate.save();
    }

    return res.status(200).json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



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
    console.log('Category:', category); // Check if category is a valid ObjectId
    console.log('User:', req.user) ;
    if (! mongoose.Types.ObjectId.isValid(category)) {
         return res.status(400).json({ message: "Invalid Category ID" }); 
        } 
        try { 
            const tasks = await Task.find({ 
                category: new  mongoose.Types.ObjectId(category) ,
                user: req.user._id ,
            }); 
            console.log('Fetched Tasks:', tasks); 
            return res.status(200).json(tasks); 
        } catch (error) { 
            console.error('Error fetching tasks by category:', error); 
            return res.status(400).json({ message: error.message }); 
        }
    }
  
