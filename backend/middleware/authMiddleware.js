import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized, token failed" });
            }
            req.user = decoded.user;
            console.log(`Decoded JWT payload: ${JSON.stringify(req.user)}`); // Log decoded token
            next();
        });
    } else {
        return res.status(401).json({ message: "User is not authorized, no token" });
    }
});
