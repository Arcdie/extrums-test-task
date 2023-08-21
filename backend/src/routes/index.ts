import { Router } from 'express';

import authRoute from './auth.route';
import counterRoute from './counter.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/api/counter', counterRoute);

export default router;
