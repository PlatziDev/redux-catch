export default errorHandler => (store) => next => action => {
  try {
    return next(action);
  } catch (error) {
    const getState = store.getState;
    errorHandler(error, { getState, action });
    return error;
  }
};
