import { Request, Response } from 'express';
import UserModel from '../models/user.model';

class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public registerUser = async (req: Request, res: Response) => {

    }

    public userLogin = async (req: Request, res: Response) => {

    }
}

export default UserController;
