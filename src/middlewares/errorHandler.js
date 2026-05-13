export const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err);

  return res.status(500).json({
    error: 'Ha ocurrido un error en el servidor',
  });
};