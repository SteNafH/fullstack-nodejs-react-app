import request from 'supertest';
import app from '../../src/index';
import DatabaseLoader from '../../src/loaders/database.loader';
import UserModel from '../../src/models/user.model';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

describe('UserController', () => {
    const userModel = new UserModel();

    afterAll(async () => {
        await DatabaseLoader.disconnect();
    });

    beforeEach(async () => {
        await userModel.deleteAll(); // Clear user collection before each test
    });

    describe('POST /register', () => {
        test('should register a new user', async () => {
            const email = 'test@example.com';
            const password = 'password';

            const response = await request(app)
                .post('/api/v1/users/register')
                .send({ email: email, password: password });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            const users = await userModel.findAll();
            expect(users.length).toBe(1);
            expect(users[0].email).toBe(email);
        });

        test('should return 409 if email already exists', async () => {
            const email = 'test@example.com';
            const password = 'password';

            await userModel.create({ id: randomUUID(), email: email, password: password });

            const response = await request(app)
                .post('/api/v1/users/register')
                .send({ email: email, password: password });

            expect(response.status).toBe(409);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Email already exists');
        });
    });

    describe('POST /login', () => {
        test('should log in a user with valid credentials', async () => {
            const email = 'test@example.com';
            const password = 'password';

            const hashedPassword = await bcrypt.hash(password, 8);
            await userModel.create({ id: randomUUID(), email: email, password: hashedPassword });

            const response = await request(app)
                .post('/api/v1/users/login')
                .send({ email: email, password: password });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.token).toBeDefined();
        });

        test('should return 401 with invalid credentials', async () => {
            const email = 'test@example.com';
            const password = 'password';

            await userModel.create({ id: randomUUID(), email, password });

            const response = await request(app)
                .post('/api/v1/users/login')
                .send({ email: email, password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Invalid credentials');
        });
    });
});
