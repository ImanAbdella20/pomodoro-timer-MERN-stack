import express from 'express';
import dotenv from 'dotenv';
import  http from 'http';
import {app , connectDB} from './app.js'

dotenv.config();
const port = process.env.PORT;  

const startServer = async()=>{
await connectDB();
const server = http.createServer(app);
server.keepAliveTimeout = 60000; // 60 seconds
server.headersTimeout = 65000; // 65 seconds

app.listen(port , () => {
    console.log(`App is listening to port ${port}`);  
})
}

startServer();

