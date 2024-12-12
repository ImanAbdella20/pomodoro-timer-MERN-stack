import express from 'express';
import { createSession, deleteSession, getSessionsByTask, getSessionsByUser, updateSession } from '../controllers/trackController.js';
import { validateFirebaseToken } from '../middleware/authMiddleware.js';

const sessionRoute = express.Router();

sessionRoute.post('/start' ,validateFirebaseToken,createSession );
sessionRoute.put('/:sessionId/update' ,validateFirebaseToken, updateSession);
sessionRoute.get('/:userId' ,validateFirebaseToken,getSessionsByUser );
sessionRoute.post('/:taskId' ,validateFirebaseToken,getSessionsByTask );
sessionRoute.post('/delete' ,validateFirebaseToken, deleteSession);

export default sessionRoute;