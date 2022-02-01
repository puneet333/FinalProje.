

import { register, login } from '../controllers/UserAuthController';
import express from 'express';
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);

export { router };