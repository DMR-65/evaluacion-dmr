export const validateEmail = (email) => {
  if (!email) {
    return res.status(400).json({
      error: 'El email es requerido',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return !emailRegex.test(email)
};