'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const path = require('node:path');

module.exports = {
    BSONDatabase: require('./BSONDatabase'),
    VERSION: require(path.resolve('package.json')).version
};
