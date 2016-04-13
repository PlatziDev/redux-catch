# redux-catch
Error catcher middleware for Redux reducers and middlewares.

## API
### Apply middleware
```javascript
import { createStore, applyMiddleware } from 'redux';

import reduxCatch from 'redux-catch';

import reducer from './reducer';

function errorHandler(error, getState) {
  console.error(error);
  console.debug('current state', getState());
}

const store = createStore(reducer, applyMiddleware(
  reduxCatch(errorHandler)
));
```
- `reduxCatch` receive a function to use when an error happen.
- The error handler function could be just a `console.error` like the example above or a function to log the error in some kind of error tracking platform.
- You should use this middleware as the first middleware in the chain, so its allowed to catch all the possible errors in the application.
