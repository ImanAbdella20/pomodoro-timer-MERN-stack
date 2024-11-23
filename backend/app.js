import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


