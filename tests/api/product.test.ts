import app from '../../src/index';
import request from 'supertest';

describe('ProductController', () => {
    describe('getAllProducts', () => {
        test('should return all products', async () => {
            const response = await request(app).get('/api/v1/products');
            expect(response.status).toBe(200);
            expect(response.body.data.products.length).toBeGreaterThan(0);
        });
    });

    describe('getProductById', () => {
        test('should return a product by id', async () => {
            const id = '20ad0c9f-b601-447b-a9a9-5c6deae5a1d0';
            const response = await request(app).get(`/api/v1/products/id/${id}`);
            expect(response.status).toBe(200);
            expect(response.body.data.product.id).toBe(id);
        });

        test('should return 404 if product not found', async () => {
            const response = await request(app).get('/api/v1/products/id/invalid_id');
            expect(response.status).toBe(404);
        });
    });

    describe('createProduct', () => {
        test('should create a new product', async () => {
            const product = {
                name: 'new product',
            };

            const response = await request(app)
                .post('/api/v1/products')
                .send(product);

            expect(response.status).toBe(200);
            expect(response.body.data.product.id).toBeTruthy();
        });
    });

    describe('deleteProduct', () => {
        test('should delete a product by id', async () => {

        });

        test('should return 404 if product not found', async () => {

        });
    });
});
