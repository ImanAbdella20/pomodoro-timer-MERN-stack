import express from 'express';
import { getSetting } from '../controllers/settingController.js';

const settingRoute = express.Router();

settingRoute.get('getsetting' , getSetting);
settingRoute.put('updatesetting' , );


export default settingRoute;