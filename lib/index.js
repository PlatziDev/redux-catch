export default errorHandler => (store) => next => action => {
  try {
    return next(action);
  } catch (error) {
    errorHandler(error, {getState: store.getState, action: action});
    return error;
  }
};
