import auth from '../../../src/middlewares/auth.middleware';
import { Request, Response } from 'express';
import UserModel from '../../../src/models/user.model';
import jwt from 'jsonwebtoken';

jest.mock('../../../src/models/user.model');
jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
    const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
    } as unknown as Response;

    test('should return a 401 error if the authorization header is missing', async () => {
        const mockReq = {
            headers: {
            }
        } as unknown as Request;
        const mockNext = jest.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized action',
        });
    });

    test('should return a 401 error if the authorization header is invalid', async () => {
        const mockReq = {
            headers: {
                authorization: 'invalid_authorization',
            }
        } as unknown as Request;

        const mockNext = jest.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized action',
        });
    });

    test('should return a 401 error if the token is invalid', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => { throw 'error' });

        const mockReq = {
            headers: {
                authorization: 'Bearer invalid_token',
            }
        } as unknown as Request;

        const mockNext = jest.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Invalid Web Token',
        });
    });

    test('should call next if the token is valid and the user is found', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => ({ id: '' }));
        UserModel.prototype.find = async () => ({ id: '', email: '', password: '' });

        const mockReq = {
            headers: {
                authorization: 'Bearer valid_token',
            }
        } as unknown as Request;
        const mockNext = jest.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test('should return a 401 error if the token is valid but the user is not found', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => ({ id: '' }));
        UserModel.prototype.find = async () => undefined;

        const mockReq = {
            headers: {
                authorization: 'Bearer valid_token',
            }
        } as unknown as Request;
        const mockNext = jest.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized action',
        });
    });
});
