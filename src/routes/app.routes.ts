import express from 'express';
import AppController from '../controllers/app.controller';

const router = express.Router();

router.get('/', AppController.getApp);

export default router;
