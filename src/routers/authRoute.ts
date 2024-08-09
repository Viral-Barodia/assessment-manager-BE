import express, { Router } from 'express';
import { handleUserLogin } from '../controllers/users';
export const authRouter: Router = express.Router();

authRouter.post('/login', handleUserLogin);