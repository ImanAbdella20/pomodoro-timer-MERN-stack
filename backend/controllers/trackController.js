import {Session} from '../models/sessionModel.js';
import {Task} from '../models/taskModel.js';
import {User} from '../models/userModel.js';

// Create a new session 
export const createSession = async (req, res) => { 
    try { 
        const { userId, taskId } = req.body; 
        
        // Check if the task exists 
        const task = await Task.findById(taskId); 
        if (!task) { 
            return res.status(404).json({ message: 'Task not found' }); 
        }
        
         // Check if the user exists 
         const user = await User.findById(userId); 
         if (!user) { 
            return res.status(404).json({ message: 'User not found' }); 
        } 
        
        const newSession = new Session({ 
            userId, 
            taskId, 
            startTime: new Date(), 
            status: 'active', 
        }); 
        const savedSession = await newSession.save(); 
        res.status(201).json(savedSession); 
    } catch (error) { 
        res.status(500).json({ message: 'Error creating session', error });
    }
}

export const updateSession = async(req,res) =>{
    try {
        const {sessionId} = req.params;
        const {status} = req.body;

        const session = await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({ message: 'Session not found'});
        }
        if (status === 'paused' || status === 'completed') { 
            session.endTime = new Date(); 
            const duration = (session.endTime - session.startTime) / 1000;// Convert to seconds 
             session.duration = duration; 
            } 
            session.status = status; 
            const updatedSession = await session.save(); 
            res.status(200).json(updatedSession); 
        } catch (error) { 
            res.status(500).json({ message: 'Error updating session', error }); 
        }
}

// Fetch sessions by user ID 
export const getSessionsByUser = async (req, res) => { 
    try { 
        const { userId } = req.params; 
        const sessions = await Session.find({ userId }).populate('taskId'); 
        res.status(200).json(sessions);
     } catch (error) { 
        res.status(500).json({ message: 'Error fetching sessions', error }); 
    }}

    // Fetch sessions by task ID 
export const getSessionsByTask = async (req, res) => { 
        try { 
            const { taskId } = req.params; 
            const sessions = await Session.find({ taskId }).populate('userId'); 
            res.status(200).json(sessions); 
        } catch (error) { 
            res.status(500).json({ message: 'Error fetching sessions', error }); 
    }}

    // Fetch a specific session by session ID 
export const getSessionById = async (req, res) => { 
        try { 
            const { sessionId } = req.params; 
            const session = await Session.findById(sessionId).populate('taskId').populate('userId'); 
            if (!session) { 
                return res.status(404).json({ message: 'Session not found' }); 
            } 
            res.status(200).json(session); 
        } catch (error) { 
            res.status(500).json({ message: 'Error fetching session', error }); 
        }}

export const deleteSession = async(req,res) =>{
            const { sessionId } = req.params;
                try {
                    const deletedTask = Task.findByIdAndDelete(sessionId);
                    if(!deletedTask){
                        return res.status(400).json({message:"Task not found"})
                    } 
                    return res.status(200).json({message:"Task deleted successfully!"})
                } catch (error) {
                    return res.status(400).json({message:error.message})
                }
            }