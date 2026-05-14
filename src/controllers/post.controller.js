import { getAllPosts, getPost, createPost, updatePost, deletePost } from '../models/post.model.js';
import { userExists } from '../models/users.model.js';

export const getPosts = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const post = await getPost(id);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const createNewPost = async (req, res, next) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({ error: "userId, title y content son requeridos" });
    }

    const userIdNum = parseInt(userId, 10);
    const exists = await userExists(userIdNum);
    if (!exists) {
      return res.status(404).json({ error: "El autor (Usuario) no existe" });
    }

    // Mapeamos a "user_id" tal como lo definimos en la base de datos
    const newPost = {
      user_id: userIdNum,
      title,
      content
    };

    const created = await createPost(newPost);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const updateExistingPost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, content } = req.body;

    const postExists = await getPost(id);
    if (!postExists) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    const postData = {};
    if (title) postData.title = title;
    if (content) postData.content = content;

    const updated = await updatePost(id, postData);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteExistingPost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const postExists = await getPost(id);
    if (!postExists) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    await deletePost(id);
    res.json({ message: "Post eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};