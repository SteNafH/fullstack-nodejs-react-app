import request from 'supertest';
import app from '../../src/index';
import { NextFunction, Request, Response } from 'express';
import ProductModel from '../../src/models/product.model';
import { Product } from '../../src/models/product.model';
import {describe, test, expect, beforeEach, afterEach, vi} from "vitest";

vi.mock('../../src/middlewares/auth.middleware', () => ({
    __esModule: true,
    default: vi.fn(() => {
        return async function (req: Request, res: Response, next: NextFunction) {
            next();
        }
    }),
}))

describe('ProductController', () => {
    const productModel = new ProductModel();
    let productId: string;

    beforeEach(async () => {
        const product: Product = {
            id: '1234',
            name: 'Test Product',
        };
        await productModel.create(product);
        productId = product.id;
    });

    afterEach(async () => {
        await productModel.deleteAll();
    });

    describe('GET /products', () => {
        test('should return a list of products', async () => {
            const res = await request(app)
                .get('/api/v1/products');

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.products.length).toBe(1);
            expect(res.body.data.products[0].id).toBe(productId);
        });
    });

    describe('GET /products/id/:id', () => {
        test('should return a product by ID', async () => {
            const res = await request(app)
                .get(`/api/v1/products/id/${productId}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.product.id).toBe(productId);
        });

        test('should return a 404 if the product is not found', async () => {
            const res = await request(app)
                .get('/api/v1/products/id/does-not-exist');

            expect(res.status).toBe(404);
            expect(res.body.status).toBe('error');
            expect(res.body.message).toBe('Product not found');
        });
    });

    describe('POST /products', () => {
        test('should create a new product', async () => {
            const product: Product = {
                id: '',
                name: 'New Product',
            };

            const res = await request(app)
                .post('/api/v1/products')
                .send(product);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.product.id).toBeDefined();

            // verify that the product was created in the database
            const productModel = new ProductModel();
            const createdProduct = await productModel.find({ id: res.body.data.product.id });
            expect(createdProduct).toEqual(res.body.data.product);
        });
    });

    describe('DELETE /products/id/:id', () => {
        test('should delete a product by ID', async () => {
            const res = await request(app)
                .delete(`/api/v1/products/id/${productId}`);

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data).toBeNull();

            // verify that the product was deleted from the database
            const productModel = new ProductModel();
            const deletedProduct = await productModel.find({ id: productId });
            expect(deletedProduct).toBeUndefined();
        });
    });
});
