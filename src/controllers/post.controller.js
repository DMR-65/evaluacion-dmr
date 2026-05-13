import { getAllPosts, getPost, createPost, updatePost, deletePost } from '../models/post.model.js';
import { userExists } from '../models/users.model.js';

export const getPosts = (req, res) => {
  const posts = getAllPosts();
  res.json(posts);
};

export const getPostById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  res.json(post);
};

export const createNewPost = (req, res) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res.status(400).json({ error: "userId, title y content son requeridos" });
  }

  const userIdNum = parseInt(userId, 10);
  if (!userExists(userIdNum)) {
    return res.status(404).json({ error: "El autor (Usuario) no existe" });
  }

  const newPost = {
    userId: userIdNum,
    title,
    content
  };

  const created = createPost(newPost);
  res.status(201).json(created);
};

export const updateExistingPost = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  if (!getPost(id)) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  const postData = {};
  if (title) postData.title = title;
  if (content) postData.content = content;

  const updated = updatePost(id, postData);
  res.json(updated);
};

export const deleteExistingPost = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!getPost(id)) {
    return res.status(404).json({ error: "Post no encontrado" });
  }

  deletePost(id);
  res.json({ message: "Post eliminado correctamente" });
};
