import { Router } from 'express';

import * as counterController from '../controllers/counter.controller';

import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.get('/read', counterController.getActualCounter);
router.get('/history', counterController.getCountersHistory);
router.post('/incr', authMiddleware, counterController.incrementCounter);
router.post('/decr', authMiddleware, counterController.decrementCounter);

export default router;
