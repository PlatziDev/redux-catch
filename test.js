const test = require('tape');
const middleware = require('./index.js');

const mockedMiddlewareAPI = {
  getState: function getState() {
    return 'test';
  },
};

const baseError = new Error('There was an error.');

function errorCase(t) {
  function mockedNext() {
    throw baseError;
  }

  t.plan(3);

  function errorHandler(error, getState) {
    t.ok(
      error.message === baseError.message,
      'it should receive the expected error message in the `errorHandler`'
    );
    t.ok(
      getState() === 'test',
      'it should get the expected state from `getState()`'
    );
  }

  const error = middleware(errorHandler)(mockedMiddlewareAPI)(mockedNext)();

  t.ok(
    error.message === baseError.message,
    'it should return the expected error message'
  );
}

function successCase(t) {
  function mockedNext(action) { return action; }

  t.plan(1);

  const action = middleware(error => error)(mockedMiddlewareAPI)(mockedNext)({
    type: 'TEST_ACTION',
  });

  t.equal(
    action.type,
    'TEST_ACTION',
    'it should be the passed action'
  );
}

test('Catch middleware - error case', errorCase);
test('Catch middleware - success case', successCase);
