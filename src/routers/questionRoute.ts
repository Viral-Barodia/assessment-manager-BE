import express, { Router } from 'express';
import { handleGetQuestion, handleCreateQuestion, handleGetAllQuestions, handleUpdateQuestion, handleDeleteQuestion } from '../controllers/questions';
import { adminAuth } from '../middlewares/authAdmin';
export const questionRouter: Router = express.Router();

questionRouter.post('/create', adminAuth,  handleCreateQuestion);
questionRouter.get('/', adminAuth, handleGetAllQuestions);
questionRouter.get('/:id', adminAuth, handleGetQuestion);
questionRouter.put('/:id', adminAuth, handleUpdateQuestion);
questionRouter.delete('/:id', adminAuth, handleDeleteQuestion);