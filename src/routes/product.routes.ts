import express from 'express';
import ProductController from '../controllers/product.controller';
import auth from '../middleware/auth.middleware';

const router = express.Router();
const productController = new ProductController();

router.get('/', auth(), productController.getAllProducts);
router.get('/id/:id', auth(), productController.getProductById);
router.post('/', auth(), productController.createProduct);
router.delete('/id/:id', auth(), productController.deleteProduct);

export default router;
