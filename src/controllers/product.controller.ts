import { Request, Response } from 'express';
import ProductModel, { Product } from '../models/product.model.js';
import { randomUUID } from 'crypto';

class ProductController {
    private productModel: ProductModel;

    constructor() {
        this.productModel = new ProductModel();
    }

    public getAllProducts = async (req: Request, res: Response) => {
        const products = await this.productModel.findAll();

        return res.status(200).json({
            status: 'success',
            data: {
                products: products,
            }
        });
    }

    public getProductById = async (req: Request, res: Response) => {
        const product = await this.productModel.find({ id: req.params.id });

        if (product)
            return res.status(200).json({
                status: 'success',
                data: {
                    product: product,
                }
            });
        else
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
    }

    public createProduct = async (req: Request, res: Response) => {
        const product = req.body as Product;
        product.id = randomUUID();

        await this.productModel.create(product);

        return res.status(200).json({
            status: 'success',
            data: {
                product: product,
            },
        });
    }

    public deleteProduct = async (req: Request, res: Response) => {
        await this.productModel.delete(req.params.id);

        return res.status(200).json({
            status: 'success',
            data: null,
        });
    }
}

export default ProductController;
