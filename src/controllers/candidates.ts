import { Request, Response } from 'express';
import {Candidate} from '../models/candidate.model';
import { StatusCodes } from '../constants/statusCodeConstants';
import { ResponseHelper } from '../helpers/responseHelper';
import { ResponseConstants } from '../constants/responseConstants';

// Create a new candidate
export const handleCreateCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        return res.status(StatusCodes.HTTP_CREATED).send(ResponseHelper(false,candidate,ResponseConstants.ADD_CANDIDATE_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_BAD_REQUEST).send(ResponseHelper(true,error,error.message));
    }
};

// Get all candidates with optional pagination
export const handleGetAllCandidates = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const candidates = await Candidate.find({ is_deleted: false })
                            .skip((+page - 1) * +limit)
                            .limit(+limit);
        const total = await Candidate.countDocuments({ is_deleted: false });
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false, {
                candidates,
                total,
                page: +page,
                limit: +limit
            },
            ResponseConstants.FETCH_CANDIDATES_SUCCESS
        ));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

// Get a single candidate by ID
export const handleGetCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate || candidate.is_deleted) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(true, [], ResponseConstants.CANDIDATE_NOT_FOUND));
        }
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false,candidate,ResponseConstants.FETCH_CANDIDATE_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

// Update a candidate by ID
export const handleUpdateCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!candidate || candidate.is_deleted) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(true, [], ResponseConstants.CANDIDATE_NOT_FOUND));
        }
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false, candidate, ResponseConstants.UPDATE_CANDIDATE_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_BAD_REQUEST).send(ResponseHelper(true,error,error.message));
    }
};

// Soft delete a candidate by ID
export const handleDeleteCandidate = async (req: Request, res: Response) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(true, [], ResponseConstants.CANDIDATE_NOT_FOUND));
        }
        candidate.is_deleted = true;
        await candidate.save();
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false,[],ResponseConstants.CANDIDATE_DELETE_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};
