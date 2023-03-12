import { Request, Response } from 'express';
import ProductModel, { Product } from '../models/product.model';
import { randomUUID } from 'crypto';

class ProductController {
    public getAllProducts = async (req: Request, res: Response) => {
        const products = await ProductModel.findAll();
        res.status(200).json(products);
    }

    public getProductById = async (req: Request, res: Response) => {
        const product = await ProductModel.find({ id: req.params.id });
        res.status(200).json(product);
    }

    public createProduct = async (req: Request, res: Response) => {
        const product = req.body as Product;
        product.id = randomUUID();

        const response = await ProductModel.create(product);
        res.status(201).json(response);
    }

    public deleteProduct = async (req: Request, res: Response) => {
        const response = await ProductModel.delete(req.params.id);
        res.status(200).json(response);
    }
}

export default new ProductController();
