const catchMiddleware = errorHandler => () => next => action => {
  try {
    return next(action);
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export default catchMiddleware;
