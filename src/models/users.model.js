import { pool } from '../config/db.js';

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const createUser = async (userData) => {
  const { name, email, role, password } = userData;
  const result = await pool.query(
    'INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, role, password]
  );
  return sanitizeUser(result.rows[0]);
};

export const getUser = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return sanitizeUser(result.rows[0]);
};

export const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows.map((u) => sanitizeUser(u));
};

export const updateUser = async (id, userData) => {
  // Construcción dinámica de la consulta para actualizar solo los campos provistos
  const keys = Object.keys(userData);
  if (keys.length === 0) return null;

  const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = keys.map(key => userData[key]);

  const result = await pool.query(
    `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  
  return sanitizeUser(result.rows[0]);
};

export const deleteUser = async (id) => {
  const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  return sanitizeUser(result.rows[0]);
};

export const userExists = async (id) => {
  const result = await pool.query('SELECT 1 FROM users WHERE id = $1', [id]);
  return result.rowCount > 0;
};