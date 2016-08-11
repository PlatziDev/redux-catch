function middlewareFactory(errorHandler) {
  return function middlewareStore(store) {
    return function middlewareNext(next) {
      return function middlewareAction(action) {
        try {
          return next(action);
        } catch (error) {
          errorHandler(error, store.getState);
          return error;
        }
      };
    };
  };
}

module.exports = middlewareFactory;
