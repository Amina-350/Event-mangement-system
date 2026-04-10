export const sendSuccess = (res, data, message="success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, error, message="error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: error.message || error,
  });
};

