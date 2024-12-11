import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/userRoute.js'
import mongoose from 'mongoose';
import cors from 'cors'; 
import categoryRoute from './routes/categoryRoute.js';
import taskRoute from './routes/taskRoute.js';

dotenv.config();
const app = express()


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// api
app.use('/auth', authRoute);
app.use('/category', categoryRoute);
app.use('/tasks' , taskRoute)


const connectDB = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING , {
             useNewUrlParser: true, 
             useUnifiedTopology: true,
            ssl: true, 
        })
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.log("Database Connection Error", error);
        process.exit(1);
    }
}

export {app , connectDB}


