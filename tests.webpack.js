// This file is the webpack entry point into our test files.

// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require('core-js/es5');
const context = require.context('./__tests__', true, /test.*\.js$/);
context.keys().forEach(context);
