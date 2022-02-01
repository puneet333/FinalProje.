import express from 'express';
const router = express.Router();
import {requireLogin} from '../middleware/validateRequest';
import { createPost, getAllPosts, myPost, like, unlike, comment, deletePost } from '../controllers/UserPostController';

router.use(requireLogin);


router.get('/api/get', getAllPosts);
router.post('/api/createPost', createPost);
router.get('/api/mypost', myPost);
router.put('/api/like', like);
router.put('/api/dislike', unlike);
router.put('/api/comment', comment);
router.delete('/api/deletepost/:postId', deletePost);

export { router };