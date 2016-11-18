const test = require('tape');
const middleware = require('./index.js');

function getState() {
  return 'test';
}

function dispatch() {
  return dispatch;
}

const mockedMiddlewareAPI = {
  getState,
  dispatch
};

const baseError = new Error('There was an error.');

const errorAction = {
  type: 'ERROR'
};

function errorCase(t) {
  function mockedNext() {
    throw baseError;
  }

  t.plan(5);

  function errorHandler(error, getState, action, dispatch) {
    t.ok(
      error.message === baseError.message,
      'it should receive the expected error message in the `errorHandler`'
    );
    t.ok(
      getState() === 'test',
      'it should get the expected state from `getState()`'
    );
    t.ok(
      action === errorAction,
      'it should pass through the action to the handler'
    );
    t.ok(
      dispatch === mockedMiddlewareAPI.dispatch,
      'dispatch should be passed to the handler'
    );
  }

  const error = middleware(errorHandler)(mockedMiddlewareAPI)(mockedNext)(errorAction);

  t.ok(
    error.message === baseError.message,
    'it should return the expected error message'
  );
}

function successCase(t) {
  function mockedNext(action) {
    return action;
  }

  t.plan(1);

  const action = middleware(error => error)(mockedMiddlewareAPI)(mockedNext)({
    type: 'TEST_ACTION'
  });

  t.equal(
    action.type,
    'TEST_ACTION',
    'it should be the passed action'
  );
}

test('Catch middleware - error case', errorCase);
test('Catch middleware - success case', successCase);
