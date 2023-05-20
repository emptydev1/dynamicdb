'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const { unset, set, get, has } = require('lodash');
const { mkdirSync } = require('node:fs');
const sqlite = require('better-sqlite3');
const kOptions = Symbol('kOptions');
const path = require('node:path');

/**
 * The SQLiteDatabase class responsible for establishing a connection to a local sqlite database.
 * @public
 * 
 * @example
 * ```js 
 * const db = require('dynamicdb').sqlite({
 *   file: "path/to/database",
 *   maxDataSize: 250
 * });
 * 
 * db.insert("dog", "cute");
 * ```
 */
module.exports = class SQLiteDatabase {
    /**
     * Creating a new database instance
     * @param {?Object} options - The options for this database
     * @param {?String} [options.file] - The file that should be used to store the database
     * @param {?Number} [options.maxDataSize] - The maximum data limit, if this limit is exceeded, it will not be possible to store any more data if it is not changed
     */
    constructor(options = {}) {
        if (!options || typeof options !== 'object') throw new TypeError(
            'The options parameter is invalid, must be of type object, received: ' +
            typeof options
        );
        
        /**
         * The options given to this database
         * @type {Object}
         */
        this[kOptions] = Object.assign({
            file: path.resolve('databases', 'database.sqlite'),
            maxDataSize: null
        }, options);
        
       if (typeof this[kOptions].file !== 'string') throw new TypeError(
           'The option "file" is invalid, must be of type string, received: ' +
           typeof this[kOptions].file
       );
       if (this[kOptions].maxDataSize !== null && typeof this[kOptions].maxDataSize !== 'number') throw new TypeError(
            'The option "maxDataSize" is not valid, must be of type number or null, received: ' +
            typeof this[kOptions].maxDataSize
        );
        if (this[kOptions].file.endsWith('.sqlite')) {
            if (this[kOptions].file.endsWith(path.sep)) this[kOptions].file += 'database.sqlite';
            else this[kOptions].file += '.sqlite';
        }
        
        mkdirSync(path.dirname(this[kOptions].file), { recursive: true });
        
        this.conn = sqlite(this[kOptions].file);
        this.conn.prepare("CREATE TABLE IF NOT EXISTS data (key TEXT, data TEXT)").run();
    }
    
    /**
     * The options provided for this instance
     * @readonly
     */
    get options() {
        return Object.freeze({ ...this[kOptions] });
    }
    
    /**
     * Insert or update a database property
     * @param {String} key - The key that should be entered or updated
     * @param {String|Number|Object|Date} - The value to be given to the key
     */
    insert(key, value) {
        if (this.size > this[kOptions].maxDataSize) throw new RangeError(`The maximum amount of data has been exceeded (${this.size}/${this[kOptions].maxDataSize}`);
        if (typeof key !== 'string') throw new TypeError(
            'The parameter "key" must be of type string, received: ' +
            typeof key
        );
        if (value === undefined) throw new TypeError('Invalid value');
        
        value = typeof value === 'string' ? value : JSON.stringify(value);
        const pattern = /([^\.\[\]]+)/g.exec(key)[0];
        let data = this.get(pattern);
        
        if (this.exists(pattern)) set(data, key.match(/([^\.\[\]]+|\[\d+\])/g).slice(1), value);
        else data = value;
        
        this.conn.prepare('INSERT INTO data (key, data) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET data=excluded.data').run(key, data);
        
        return data;
     }
     
     /**
     * Insert or update a database property
     */
    set() {
        return this.insert(...arguments);
    }
    
    /**
     * It looks for a value in the database, if it already exists it will just return it, otherwise it will insert a new value in the database
     * @param {String} key - The key to look for
     * @param {String|Number|Object|Date} - The value that must be inserted in the key if it does not exist
     */
    fetch(key, value) {
        return this.exists(key) ? this.get(key) : this.insert(key, value);
    }
    
    /**
     * Checks the type of the value of a specific key
     * @param {String} key - The key that should have the type of its return value
     */
    type(key) {
        return this.exists(key) ? typeof this.get(key) : void 0;
    }
    
    /**
     * Converts all database values into a buffer
     * @param {?Number} limit - The maximum limit of data that must be converted to buffer
     */
    toBuffer() {
        return readFileSync(this[kOptions].file);
    }
    
    /**
     * Converts all database values to a string
     * @param {?Number} limit - The maximum amount of data that should be returned in string
     */
    stringify() {
        return this.toBuffer().toString('utf-8');
    }
    
    /**
     * Looks for database properties through a callback and deletes them
     * @param {Function} cb - The callback that should be used as a basis for searching for elements
     */
    findAndDelete(cb) {
        const filtered = this.filter(cb);
        
        for (const { key } of filtered) this.delete(key);
        
        return filtered;
    }
    
    /**
     * Enter multiple values at once
     * @param {Array} arr - An array containing the data to be inserted into the database
     */
    insertMany(arr) {
        if (!Array.isArray(arr)) throw new TypeError('The parameter "arr" is not an array');
        if (!arr.every(el => typeof el === 'object')) throw new TypeError('The parameter "arr" contains non-object elements');
        if (!arr.every(el => {
            const key = Object.keys(el)[0];
            return typeof key === 'string' || el[key] !== undefined;
        })) throw new TypeError('The parameter "data" contains invalid entries');
        
        for (const element of arr) {
            const [key, value] = Object.entries(element)[0];
            
            this.insert(key, value);
        }
                
        return this.values();
    }
    
    /**
     * Method responsible for performing mathematical expressions through database values
     * @param {String} key - The key in which to have its value used
     * @param {String} operator - The operator that will be used in the expression
     * @param {Number} value - The number to be used
     * @param {Boolean} ignore_negative - Whether are to ignore negative results
     */
    math(key, operator, value, ignore_negative = false) {
        if (typeof key !== 'string') throw new TypeError(
            'The parameter "key" must be of type string, received: ' +
            typeof key
        );
        if (typeof value !== 'number') throw new TypeError('The parameter "value" is not a number');
        
        var data = this.get(key);
        
        if (typeof data !== 'number') throw new Error('The provided key does not have a numerical value or is non-existent');
        
        switch (operator) {
            case '+': {
                data += value;
            break; }
            case '-': {
                data -= value;
            break; }
            case '*': {
                data *= value;
            break; }
            case '/': {
                data /= value;
            break; }
            case '%': {
                data %= value;
            break; }
            default: {
                throw new TypeError('The parameter "operator" is invalid, must be one of: +, -, *, /, %');
            break; }
        }
        
        return this.insert(key, ignore_negative ? data <= 0 ? 0 : data : data);
    }
    
    /**
     * Adds a value to a key
     * @param {String} key - The key to use
     * @param {Number} value - The value that will be used to add
     */
    add(key, value) {
        return this.math(key, '+', value);
    }
    
    /**
     * Subtracts a specific value from a key
     * @param {String} key - The key to use
     * @param {Number} value - The value that will be used to subtract
     */
    sub(key, value) {
        return this.math(key, '-', value);
    }
    
    /**
     * Multiplies a value by the key value
     * @param {String} key - The key to use
     * @param {Number} value - The value that will be used to multiplie 
     */
    multi(key, value) {
        return this.math(key, '*', value);
    }
    
    /**
     * Divides a value by the key value
     * @param {String} key - The key to use
     * @param {Number} value - The value that will be used to divide 
     */
    divide(key, value) {
        return this.math(key, '/', value);
    }
    
    /**
     * View the value of a specific key
     * @param {String} key - The key at which the return value should be
     * @param {*} df - The value to be returned if the key is not found
     */
    get(key, df = null) {
        let value = this.values();
        
        key.match(/([^\.\[\]]+|\[\d+\])/g).forEach(match => {
            value = get(value, match.replace(/\[|\]/g, ''), df);        
        });
        
        return value;
    }
    
    /**
     * Delete a database property by its key
     * @param {String} key - The key to be searched for and deleted
     */
    delete(key) {
        if (typeof key !== 'string') throw new TypeError('The parameter "key" must a string');
        
        
    }
    
    /**
     * Delete multiple values at once
     * @param {Array} arr - An array containing the name of documets to be deleted into the database
     */
    deleteMany(arr) {
        if (!Array.isArray(arr)) throw new TypeError('The parameter "arr" is not an array');
        if (!arr.every(el => typeof el === 'string')) throw new TypeError('The parameter "arr" contains non-string elements');
        
        const placeholders = arr.map(() => '?').join(', '); 
        const data = this.conn.prepare(`DELETE FROM data WHERE key IN (${placeholders})`).run(...arr);
        
        return data.changes > 0 ? arr : [];
    }
    
    /**
     * Clears the database, resets all data that has already been logged
     * @returns {void}
     */
    clear() {
        this.conn.prepare('DELETE FROM data').run();
        return true;
    }
    
    /**
     * Ends the SQLite connection
     * @returns {void}
     */
    close() {
        this.conn.close();
    }
    
    /**
     * Delete selected data storage file
     * @returns {void}
     */
    unlink() {
        unlinkSync(this[kOptions].file);
    }
    
    /**
     * Returns all values from the database
     * @returns {Object}
     */
    values() {
        return this.conn.prepare('SELECT key, data FROM data')
            .all()
            .reduce((acc, item) => {
                acc[item.key] = item.data;
                return acc;
            }, {});
    }
    
    /**
     * Returns an array containing all values from the database
     * @param {?Number} limit - The maximum likeite of data that should be returned by the function
     */
    toArray(limit = null) {
        const entries = Object.entries(this.values());
        const data = [];
        
        for (const [key, val] of entries) {
            data.push({ key, data: val });
        }
        
        return typeof limit === 'number' ? data.slice(0, limit) : data;
    }
    
    /**
     * Adds an element to an array of a specific key
     * @param {String} key - The key whose value should be changed
     * @param {*} value - The value that should be added to the key array
     */
    push(key, ...args) {
        const data = this.fetch(key, []);
        
        if (!Array.isArray(data)) throw new Error(`Key value '${key}' is not a valid array`);
        
        Array.prototype.push.call(data, ...args);
        
        return this.insert(key, data);
    }
    
    /**
     * Cut an array
     * @returns {Array}
     */
    splice(key, ...args) {
        const data = this.get(key);
        
        if (!Array.isArray(data)) throw new Error(`Key value '${key}' is not a valid array or does not exists`);
        
        Array.prototype.splice.call(data, ...args);
        
        return this.insert(key, data);
    }
    
    /**
     * Makes a set of 2 or more arrays
     * @returns {Array}
     */
    concat(key, ...args) {
        const data = this.get(key);
        
        if (!Array.isArray(data)) throw new Error(`Key value '${key}' is not a valid array or does not exists`);
        
        return this.insert(key, Array.prototype.concat.call(data, ...args));
    }
    
    /**
     * This function removes elements from a document by their key through a callback
     * @param {String} key - The key to be used
     * @param {?Boolean} multiple - Whether to delete all elements found by the provided callback or only the first one
     * @param {Function} cb - The callback for use to filter the elements
     */
    pull(key, multiple = false, cb) {
        if (typeof key !== 'string') throw new TypeError(
            'The parameter "key" must be a string, received: ' +
            typeof key
        );
        
        if (typeof multiple === 'function') {
            cb = multiple;
            multiple = false;
        }
        
        const data = this.get(key);
        const arr = [];
        
        if (!Array.isArray(data)) throw new Error(`The value of "${key}" is not a valid array`);
        if (multiple) {
            const index = Array.prototype.findIndex.call(data, cb);
            
            data.splice(index, 1);
            arr.push(...data);
        } else for (const index in data) if (!cb(data[index], index, data)) arr.push(data[index]);
        
        return this.insert(key, arr);
    }
    
    /**
     * Returns all keys included in the database in array form
     * @returns {Array}
     */
    keys() {
        return this
            .map(({ key }) => key);
    }
    
    /**
     * Checks if a key exists in the database and returns a boolean value
     * @param {String} key - The key to look for
     */
    exists(key) {
        return this
            .toArray()
            .findIndex(el => el.key === key) > -1;
    }
    
    /**
     * Checks if a key exists in the database and returns a boolean value
     * @param {String} key - The key to look for
     */
    has(key) {
        return this.exists(key);
    }
    
    /**
     * Search for a property in the database through a callback
     * @returns {?Object}
     */
    find() {
        return Array.prototype.find.call(this.toArray(), ...arguments);
    }
    
    /**
     * Maps database values through a callback
     * @returns {Array}
     */
    map() {
        return Array.prototype.map.call(this.toArray(), ...arguments);
    }
    
    /**
     * Draws values from the database through a callback
     * @returns {Object}
     */
    sort() {
        return Array.prototype.sort.call(this.toArray(), ...arguments);
    }
    
    /**
     * Reduces database values
     * @returns {*}
     */
    reduce() {
        return Array.prototype.reduce.call(this.toArray(), ...arguments);
    }
    
    /**
     * Filter the database through a callback
     * @returns {Array}
     */
    filter() {
        return Array.prototype.filter.call(this.toArray(), ...arguments);
    }
    
    /**
     * Performs an action for each database element
     * @returns {void}
     */
    forEach() {
        Array.prototype.forEach.call(this.toArray(), ...arguments);
    }
    
    /**
     * Returns the number of documents registered in the database
     * @returns {Number}
     * @readonly
     */
     get size() {
         return this.toArray().length;
     }
    
    /**
     * Returns the current database latency in milliseconds
     * @returns {Number}
     * @readonly
     */
    get ping() {
        const timer = new Date().getTime();
        
        this.conn.prepare('SELECT 1').get();
        
        return new Date().getTime() - timer;
    }
};
