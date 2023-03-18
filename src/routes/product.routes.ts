import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/id/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/id/:id', productController.deleteProduct);

export default router;
