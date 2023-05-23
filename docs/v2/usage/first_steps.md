# First steps

To start using the database, it is recommended that you read this page of the documentation first.

DynamicDB is a database that supports SQLite and BSON, so you can choose the one that best suits your project.

## Installation 

To install this dependency to your project you must have **[Node.js](https://github.com/nodejs/node)** installed on your machine.

If you already have **Node.js** installed on your machine, just run the following command in your terminal:

```
$ npm install dynamicdb@latest --save
```

**Note:** It is highly recommended that when installing this dependency you install the latest released version.

## Creating a database instance

### Using SQLite:
```js
const db = require('dynamicdb').sqlite({
  file: 'path/to/database',
  maxDataSize: 500 // default is 1e+20
});
```

### Using BSON:
```js
const db = require('dynamicdb').bson({
  file: 'path/to/database',
  maxDataSize: 500 // default is 1e+20
});
```

If you want to see examples of how to use the database, access the **[documentation](https://github.com/emptydev1/dynamicdb/blob/master/docs)**.
