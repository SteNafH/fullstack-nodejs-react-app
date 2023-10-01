import auth from '../../../src/middlewares/auth.middleware';
import { Request, Response } from 'express';
import UserModel from '../../../src/models/user.model';
import jwt from 'jsonwebtoken';
import {describe, test, expect, vi} from "vitest";

vi.mock('../../../src/models/user.model');
vi.mock('jsonwebtoken');

describe('authMiddleware', () => {
    const mockRes = {
        status: vi.fn(() => mockRes),
        json: vi.fn(),
    } as unknown as Response;

    test('should return a 401 error if the authorization header is missing', async () => {
        const mockReq = {
            headers: {
            }
        } as Request;
        const mockNext = vi.fn();

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
        } as Request;

        const mockNext = vi.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized action',
        });
    });

    test('should return a 401 error if the token is invalid', async () => {
        vi.mocked(jwt.verify).mockImplementation(() => { throw 'error' });

        const mockReq = {
            headers: {
                authorization: 'Bearer invalid_token',
            }
        } as Request;

        const mockNext = vi.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Invalid Web Token',
        });
    });

    test('should call next if the token is valid and the user is found', async () => {
        vi.mocked(jwt.verify).mockImplementation(() => ({ id: '' }));
        UserModel.prototype.find = async () => ({ id: '', email: '', password: '' });

        const mockReq = {
            headers: {
                authorization: 'Bearer valid_token',
            }
        } as Request;
        const mockNext = vi.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalled();
    });

    test('should return a 401 error if the token is valid but the user is not found', async () => {
        vi.mocked(jwt.verify).mockImplementation(() => ({ id: '' }));
        UserModel.prototype.find = async () => undefined;

        const mockReq = {
            headers: {
                authorization: 'Bearer valid_token',
            }
        } as Request;
        const mockNext = vi.fn();

        await auth()(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Unauthorized action',
        });
    });
});
