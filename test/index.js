import test from 'tape';

import middleware from '../build/index.js';

const mockedMiddlewareAPI = {};
const baseError = new Error('There was an error.');

test('Catch middleware - error case', t => {
  const mockedNext = () => {
    throw baseError;
  };

  t.plan(2);

  function errorHandler(error) {
    t.ok(
      error.message === baseError.message,
      'it should receive the expected error message in the `errorHandler`'
    );
  }

  const error = middleware(errorHandler)(mockedMiddlewareAPI)(mockedNext)();

  t.ok(
    error.message === baseError.message,
    'it should return the expected error message'
  );
});

test('Catch middleware - success case', t => {
  const mockedNext = action => action;

  t.plan(1);

  const action = middleware(error => error)(mockedMiddlewareAPI)(mockedNext)({
    type: 'TEST_ACTION',
  });

  t.equal(
    action.type,
    'TEST_ACTION',
    'it should be the passed action'
  );
});
