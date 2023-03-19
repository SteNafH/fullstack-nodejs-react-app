import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import Config from '../configs/config';

class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    public registerUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await this.userModel.find({ email: email });
        if (existingUser) {
            return res.status(409).json({
                status: "error",
                message: "Email already exists",
            });
        }

        const salt = bcrypt.genSaltSync(8);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await this.userModel.create({ id: randomUUID(), email: email, password: hashedPassword});

        return res.status(200).json({
            status: 'success',
        });
    }

    public userLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await this.userModel.find({ email: email });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({id: user.id}, Config.SECRET_JWT, { expiresIn: '24h'})

        return res.status(200).json({
            status: "success",
            data: {
                token: token,
            }
        });
    }
}

export default UserController;
