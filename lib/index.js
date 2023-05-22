'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const SQLiteDatabase = require('./drivers/sqlite');
const BSONDatabase = require('./drivers/bson');

module.exports = Object.freeze({
    sqlite: function() {
        return new SQLiteDatabase(...arguments);
    },
    bson: function() {
        return new BSONDatabase(...arguments);
    },
    isValidPropertyValue: require('./utils/isValidPropertyValue'),
    version: require('../package').version
});
