import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function setToken(user: any) {
    const payload = {
        _id: user._id.toString(),
        email: user.email
    };
    let secret_key: string = process.env.JWT_SEC_KEY ? process.env.JWT_SEC_KEY : '';
    return jwt.sign(payload, secret_key, { expiresIn: '4h' });
}

export function getToken(token: any) {
    if(!token) {
        return null;
    }
    try {
        return jwt.verify(token, process.env.JWT_SEC_KEY as string) as { _id: string };
    } catch(err) {
        return  null;
    }
}