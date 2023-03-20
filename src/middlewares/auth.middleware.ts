import UserModel from '../models/user.model';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../configs/config';

const userModel = new UserModel();

interface Token {
    id: string;
    iat: number;
    exp: number;
}

const auth = () => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer))
                return res.status(401).json({
                    status: 'error',
                    message: 'Unauthorized action',
                });

            const token = authHeader.replace(bearer, '');

            const decoded = jwt.verify(token, Config.SECRET_JWT) as Token;
            const user = await userModel.find({ id: decoded.id });

            if (!user)
                return res.status(401).json({
                    status: 'error',
                    message: 'Unauthorized action',
                });

            next();
        } catch (error) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid Web Token',
            });
        }
    }
}

export default auth;
