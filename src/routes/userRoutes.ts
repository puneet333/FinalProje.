import express from 'express';
const router = express.Router();
import {requireLogin} from '../middleware/validateRequest';
import { userProfile } from '../controllers/UserController';

router.use(requireLogin);
router.get('/user/:id', userProfile);

export { router };