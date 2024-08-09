import express, { Router } from 'express';
import { handleCreateCandidate, handleGetAllCandidates, handleGetCandidate, handleUpdateCandidate, handleDeleteCandidate } from '../controllers/candidates';
import { adminAuth } from '../middlewares/authAdmin';
export const candidateRouter: Router = express.Router();

candidateRouter.post('/create', adminAuth,  handleCreateCandidate);
candidateRouter.get('/', adminAuth, handleGetAllCandidates);
candidateRouter.get('/:id', adminAuth, handleGetCandidate);
candidateRouter.put('/:id', adminAuth, handleUpdateCandidate);
candidateRouter.delete('/:id', adminAuth, handleDeleteCandidate);