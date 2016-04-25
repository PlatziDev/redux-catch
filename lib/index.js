export default errorHandler => (store) => next => action => {
  try {
    return next(action);
  } catch (error) {
    errorHandler(error, store.getState);
    return error;
  }
};
