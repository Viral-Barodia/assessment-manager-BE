import { StatusCodes } from "../constants/statusCodeConstants";
import { ResponseConstants } from "../constants/responseConstants";
import { setToken } from "../services/auth";
import { Account } from '../models/account.model';
import { Request, Response } from 'express';
import { Role } from "../models/role.model";

export async function handleUserLogin(req: Request, res: Response) {
    const body = req.body;
    try {
        const user = await Account.findOne({ email: body.email, password: body.password });
        if(!user) {
            return res.status(StatusCodes.HTTP_BAD_REQUEST).send({ hasError: true, data: [], message: ResponseConstants.WRONG_CREDENTIALS });
        }
        const token = setToken(user);
        const role = await userRole(user);
        if(!role) {
            return res.status(StatusCodes.HTTP_FORBIDDEN).send({ hasError: true, data: [], message: ResponseConstants.INVALID_USER });
        }
        return res.status(StatusCodes.HTTP_OK).send({ hasError: false, data: { user: user, token: token, role: role }, message: ResponseConstants.LOGIN_SUCCESS });
    } catch(e) {
        return res.status(StatusCodes.HTTP_INTERNAL_SERVER_ERROR).send({ hasError: true, data: e, message: ResponseConstants.INTERNAL_SERVER_ERROR });
    }
}

async function userRole(user: any): Promise<string|null> {
    const adminRole = await Role.findOne({ roleName: 'admin' });
    const deliveryAdminRole = await Role.findOne({ roleName: 'delivery admin' });
    if(user.role.toString() === adminRole?._id.toString()) {
        return 'admin';
    } else if(user.role.toString() === deliveryAdminRole?._id.toString()) {
        return 'delivery admin';
    }
    return null;
}