import { Router } from 'express';
import { getUsers, getUserById, createNewUser, updateExistingUser, deleteExistingUser } from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.js';


const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', authMiddleware, createNewUser);
router.put('/:id', authMiddleware, updateExistingUser);
router.delete('/:id', authMiddleware, deleteExistingUser);

export default router;
