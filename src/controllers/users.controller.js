import { getAllUsers, getUser, createUser, updateUser, deleteUser, userExists } from '../models/users.model.js';
import { getPostsByUserId, deletePostsByUserId } from '../models/post.model.js';

export const getUsers = (req, res) => {
  const users = getAllUsers();
  res.json(users);
};

export const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = getUser(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const userPosts = getPostsByUserId(id);
  res.json({ ...user, posts: userPosts });
};

export const createNewUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y email son requeridos" });
  }

  const newUser = {
    id: 1,
    name,
    email,
    role: req.body.role || 'user'
  };

  const users = getAllUsers();
  if (users.length > 0) {
    newUser.id = Math.max(...users.map(u => u.id)) + 1;
  }

  const created = createUser(newUser);
  res.status(201).json(created);
};

export const updateExistingUser = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  if (!userExists(id)) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const userData = {};
  if (name) userData.name = name;
  if (email) userData.email = email;

  const updated = updateUser(id, userData);
  res.json(updated);
};

export const deleteExistingUser = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!userExists(id)) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  deletePostsByUserId(id);
  deleteUser(id);

  res.json({ message: "Usuario y sus posts eliminados correctamente" });
};
