export const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;

  return value
    .replace(/<[^>]*>?/gm, '') // elimina HTML
    .replace(/[^\w\s@.-]/gi, '') // elimina caracteres raros
    .trim();
};

export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return email;

  const clean = sanitizeString(email).toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(clean) ? clean : null;
};

export const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'string') {
      if (key.toLowerCase().includes('email')) {
        sanitized[key] = sanitizeEmail(value);
      } else {
        sanitized[key] = sanitizeString(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value); 
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
};