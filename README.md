# redux-catch
Error catcher middleware for Redux reducers and sync middlewares.

[![Build Status](https://travis-ci.org/PlatziDev/redux-catch.svg?branch=master)](https://travis-ci.org/PlatziDev/redux-catch)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## API
### Apply middleware
```javascript
import { createStore, applyMiddleware } from 'redux';

import reduxCatch from 'redux-catch';

import reducer from './reducer';

function errorHandler(error, getState, lastAction, dispatch) {
  console.error(error);
  console.debug('current state', getState());
  console.debug('last action was', lastAction);
  // optionally dispatch an action due to the error using the dispatch parameter
}

const store = createStore(reducer, applyMiddleware(
  reduxCatch(errorHandler)
));
```

- `reduxCatch` receive a function to use when an error happen.
- The error handler function could be just a `console.error` like the example above or a function to log the error in some kind of error tracking platform.
- You should use this middleware as the first middleware in the chain, so its allowed to catch all the possible errors in the application.

### Using it with [Sentry](https://www.getsentry.com/)
To use it with Sentry just download the Sentry script from npm:

```bash
npm i -S raven-js raven
```

- [raven-js](https://www.npmjs.com/package/raven-js): This is the client for browser usage.
- [raven-node](https://github.com/getsentry/raven-node): This is the client for server usage.

Now load and configure your client:

```javascript
import Raven from 'raven-js';

const sentryKey = '<key>';

Raven
  .config(`https://${sentryKey}@app.getsentry.com/<project>`)
  .install();
```

And then use `Raven.captureException` as the error handler like this:

```javascript
const store = createStore(reducer, applyMiddleware(
  reduxCatch(error => Raven.captureException(error));
));
```

Now `redux-catch` will start to send the errors of your reducers and middlewares to Sentry.

#### Add state as extra data
You can also add the state data as extra data for your errors so you can know the state at the moment of the error.

```javascript
function errorHandler(error, getState, action) {
  Raven.context({
    state: getState(),
    action,
  });
  Raven.captureException(error);
}
```
