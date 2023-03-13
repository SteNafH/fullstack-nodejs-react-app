import { Request, Response } from 'express';
import UserModel from '../models/user.model';

class UserController {
    public getAllUsers = async (req: Request, res: Response) => {
        const users = await UserModel.findAll();
        res.status(200).json(users);
    }
}

export default new UserController();
