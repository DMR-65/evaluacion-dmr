import { Router } from 'express';
import { getPosts, getPostById, createNewPost, updateExistingPost, deleteExistingPost } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createNewPost);
router.put('/:id', authMiddleware, updateExistingPost);
router.delete('/:id', authMiddleware, deleteExistingPost);

export default router;
