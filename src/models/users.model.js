export const users = [
  { id: 1, name: "fernando", email: "fernando@example.com", role: "admin", password: "fernando123" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "user", password: "bob123" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "user", password: "charlie123" },
  { id: 4, name: "Diana", email: "diana@example.com", role: "user", password: "diana123" },
  { id: 5, name: "Eve", email: "eve@example.com", role: "guest", password: "eve123" },
  { id: 6, name: "Frank", email: "frank@example.com", role: "user", password: "frank123" },
  { id: 7, name: "Grace", email: "grace@example.com", role: "user", password: "grace123" },
  { id: 8, name: "Henry", email: "henry@example.com", role: "guest", password: "henry123" }
];

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const createUser = (user) => {
  users.push(user);
  return sanitizeUser(user);
};

export const getUser = (id) => {
  const user = users.find((u) => u.id === id);
  return sanitizeUser(user);
};

export const getAllUsers = () => {
  return users.map((u) => sanitizeUser(u));
};

export const updateUser = (id, userData) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...userData };
  return sanitizeUser(users[index]);
};

export const deleteUser = (id) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const deleted = users.splice(index, 1)[0];
  return sanitizeUser(deleted);
};

export const userExists = (id) => {
  return users.some((u) => u.id === id);
};
