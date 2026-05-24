import { Router } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../config/db.js'; // Importamos la conexión a la base de datos
import { generateToken } from '../utils/jwt.js';

const router = Router();

// Hash dummy para evitar user enumeration timing attacks
const DUMMY_HASH = '$2b$10$8wJ9Qx8H5l8Y7K3QmK5xEu0dS7YFJ8W1hQx2P5rK8mL4cN7vB2u3G';

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    // 1. Buscamos al usuario por su email directamente en la base de datos
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Usar hash real o dummy
    const passwordHash = user?.password || DUMMY_HASH;

    //Cambiamos la posicion de ejecucion del comparador para que este ocurra siempre
    // 2. Comparamos la contraseña en texto plano con el hash de la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    // Si el usuario no existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 3. Generamos el token (omitiendo la contraseña, por supuesto)
    const token = await generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    res.json({ token });
  } catch (error) {
    // Si hay un error de conexión u otro problema, lo pasamos al errorHandler
    next(error);
  }
});

export default router;