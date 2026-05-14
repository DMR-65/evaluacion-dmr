import { pool } from '../config/db.js';

export const createPost = async (postData) => {
  const { user_id, title, content } = postData;
  const result = await pool.query(
    'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
    [user_id, title, content]
  );
  return result.rows[0];
};

export const getPost = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllPosts = async () => {
  // Realizamos un JOIN para adjuntar el nombre del autor directamente desde la BD
  const query = `
    SELECT p.id, p.user_id, p.title, p.content, 
           COALESCE(u.name, 'Usuario Desconocido') AS "authorName"
    FROM posts p
    LEFT JOIN users u ON p.user_id = u.id
  `;
  const result = await pool.query(query);
  return result.rows;
};

export const getPostsByUserId = async (userId) => {
  const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [userId]);
  return result.rows;
};

export const updatePost = async (id, postData) => {
  const keys = Object.keys(postData);
  if (keys.length === 0) return null;

  const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
  const values = keys.map(key => postData[key]);

  const result = await pool.query(
    `UPDATE posts SET ${setClause} WHERE id = $1 RETURNING *`,
    [id, ...values]
  );
  
  return result.rows[0];
};

export const deletePost = async (id) => {
  const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

export const deletePostsByUserId = async (userId) => {
  // Retorna la cantidad de posts eliminados o los posts en sí, según prefieras
  const result = await pool.query('DELETE FROM posts WHERE user_id = $1 RETURNING *', [userId]);
  return result.rows;
};