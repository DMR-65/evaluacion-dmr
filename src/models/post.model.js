import { getUser } from './users.model.js';

export const posts = [
  { id: 1, userId: 1, title: "Mi primer post", content: "Hola mundo!" },
  { id: 2, userId: 1, title: "Aprendiendo Node", content: "MVC es genial." },
  { id: 3, userId: 2, title: "Duda técnica", content: "¿Cómo uso Express?" },
  { id: 4, userId: 3, title: "Mi experiencia con JavaScript", content: "Después de meses de práctica, finalmente entiendo los closures." },
  { id: 5, userId: 3, title: "Tips para APIs REST", content: "Aquí van mis 5 tips para diseñar una buena API REST." },
  { id: 6, userId: 4, title: "Primeros pasos con Docker", content: "Docker ha cambiado mi forma de desarrollar aplicaciones." },
  { id: 7, userId: 4, title: "Contenedores vs VMs", content: "Comparando las ventajas y desventajas de cada tecnología." },
  { id: 8, userId: 5, title: "Programación funcional", content: "Introducción a los conceptos de programación funcional en JS." },
  { id: 9, userId: 6, title: "Mi setup de desarrollo", content: "Les muestro las herramientas que uso día a día." },
  { id: 10, userId: 6, title: "VS Code extensions", content: "Las extensiones que no pueden faltar en tu editor." },
  { id: 11, userId: 7, title: "Bases de datos SQL", content: "Por qué sigo prefiriendo SQL sobre NoSQL." },
  { id: 12, userId: 7, title: "Optimización de consultas", content: "Cómo mejorar el rendimiento de tus queries." },
  { id: 13, userId: 8, title: "Gitflow workflow", content: "Mi flujo de trabajo con Git para proyectos en equipo." },
  { id: 14, userId: 8, title: "Resolviendo conflictos", content: "Estrategias para resolver conflictos de merge sin drama." },
  { id: 15, userId: 1, title: "Express middleware", content: "Entendiendo cómo funcionan los middlewares en Express." }
];

export const createPost = (postData) => {
  const newPost = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    ...postData
  };
  posts.push(newPost);
  return newPost;
};

export const getPost = (id) => {
  return posts.find((p) => p.id === id);
};

export const getAllPosts = () => {
  return posts.map((p) => {
    const author = getUser(p.userId);
    return {
      ...p,
      authorName: author ? author.name : "Usuario Desconocido"
    };
  });
};

export const getPostsByUserId = (userId) => {
  return posts.filter((p) => p.userId === userId);
};

export const updatePost = (id, postData) => {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...postData };
  return posts[index];
};

export const deletePost = (id) => {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const deleted = posts.splice(index, 1)[0];
  return deleted;
};

export const deletePostsByUserId = (userId) => {
  posts = posts.filter((p) => p.userId !== userId);
};
