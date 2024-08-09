import { Request, Response } from 'express';
import { Question } from '../models/question.model';
import { StatusCodes } from '../constants/statusCodeConstants';
import { ResponseConstants } from '../constants/responseConstants';
import { ResponseHelper } from '../helpers/responseHelper';

export const handleCreateQuestion = async (req: Request, res: Response) => {
    try {
        const question = new Question(req.body);
        await question.save();
        return res.status(StatusCodes.HTTP_CREATED).send(ResponseHelper(false,question,ResponseConstants.ADD_QUESTION_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

export const handleGetQuestion = async (req: Request, res: Response) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(false,[],ResponseConstants.QUESTION_NOT_FOUND));
        }
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false,question,ResponseConstants.GET_QUESTION_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

export const handleGetAllQuestions = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const questions = await Question.find()
            .skip((+page - 1) * +limit)
            .limit(+limit);
        const total = await Question.countDocuments();
        return res.status(200).send(ResponseHelper(false,{
            questions,
            total,
            page: +page,
            limit: +limit
        },ResponseConstants.QUESTIONS_FETCH_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

export const handleUpdateQuestion = async (req: Request, res: Response) => {
    try {
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!question) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(false,[],ResponseConstants.QUESTION_NOT_FOUND));
        }
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false, question, ResponseConstants.UPDATE_QUESTION_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};

export const handleDeleteQuestion = async (req: Request, res: Response) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send({ message: 'Question not found' });
        }
        return res.status(StatusCodes.HTTP_OK).send(ResponseHelper(false,[],ResponseConstants.DELETE_QUESTION_SUCCESS));
    } catch (error: any) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send(ResponseHelper(true,error,error.message));
    }
};