export const validatePassword = (password) => {
  const minLength = 8;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]+$/;

  if (!password || password.length < minLength) {
    return {
      status: false,
      message: `La contraseña debe tener al menos ${minLength} caracteres`,
    };
  }

  if (!passwordRegex.test(password)) {
    return {
      status: false,
      message:
        'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales',
    };
  }

  return {
    status: true,
    message: 'Ok',
  };
};