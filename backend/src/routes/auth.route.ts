import { Router } from 'express';

import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.loginUser);

export default router;
