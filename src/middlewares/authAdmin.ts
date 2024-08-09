import { ResponseConstants } from '../constants/responseConstants';
import { StatusCodes } from '../constants/statusCodeConstants';
import { Account } from '../models/account.model';
import { getToken } from "../services/auth";
import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/role.model';
import { ResponseHelper } from '../helpers/responseHelper';

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ', '');
        if (!token) {
            return res.status(StatusCodes.HTTP_BAD_REQUEST).send(ResponseHelper(
                true,
                [],
                ResponseConstants.MISSING_TOKEN
            ));
        }

        const decodedToken = getToken(token);
        if (!decodedToken) {
            return res.status(StatusCodes.HTTP_BAD_REQUEST).send({
                hasError: true,
                data: [],
                message: ResponseConstants.INVALID_TOKEN
            });
        }

        const user = await Account.findById(decodedToken._id);
        if (!user) {
            return res.status(StatusCodes.HTTP_NOT_FOUND).send(ResponseHelper(
                true,
                [],
                ResponseConstants.INVALID_USER
            ));
        }

        const adminRole = await Role.findOne({ roleName: 'admin' });
        const deliveryAdminRole = await Role.findOne({ roleName: 'delivery admin' });
        if (user.role.toString() !== adminRole?._id.toString() && user.role.toString() !== deliveryAdminRole?._id.toString()) {
            return res.status(StatusCodes.HTTP_FORBIDDEN).send(ResponseHelper(
                true,
                [],
                ResponseConstants.FORBIDDEN_ACCESS
            ));
        }
        req.body.role = user.role;
        next();
    } catch (err) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send({
            hasError: true,
            data: [],
            message: ResponseConstants.INTERNAL_SERVER_ERROR
        });
    }
};
