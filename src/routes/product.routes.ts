import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/id/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.delete('/id/:id', ProductController.deleteProduct);

export default router;
