import { Router } from 'express';
import { users } from '../models/users.model.js';
import { generateToken } from '../utils/jwt.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y password son requeridos' });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = await generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });

  res.json({ token });
});

export default router;
