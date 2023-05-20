<h1 align="center">DynamicDB</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/dynamicdb.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dt/dynamicdb.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/emptydev1/dynamicdb.svg" alt="license">
</p>

<p>A local database package that has support for SQLite and BSON.</p>

<h1 align="center">Features</h1>

- It has two types of data storage, SQLite and BSON.
- Easy to use and returns responses quickly.
- High performance and scalability.

<h1 align="center">Instalation</h1>

<p>To install the dependency in your project, you can run one of the following commands in your terminal:</p>

```sh-session
npm install dynamicdb
// or...
yarn add dynamicdb
```

<h1 align="center">Usage</h1>

<h3>Creating a new database</h3>

<h4>Using SQLite:</h4>

```js
const db = require('dynamicdb').sqlite({
  file: './database/data.sqlite'
});
```

<h4>Using BSON:</h4>

```js
const db = require('dynamicdb').bson({
  file: './database/data.bson'
});
```

In these examples we use the `sqlite` and `bson` methods to create a new database instance so that we can manage data.

<h3>Entering data</h3>

You can use the `insert` function to insert a single document or the `insertMany` function to insert multiple documents at once.

```js
// Insert or edit a document
db.insert('dog', 'cute');

// Insert multiple documents
db.insertMany([ { number: 1000 }, { money: 100 } ]);
```

<h3>Querying data</h3>

For querying data there are several methods available, but the main ones are `get` and `find`.

```js
// View the value of a document by its key
db.get('money'); // 100

// Search a document
db.find(element => element.key.startsWith('do')); // { key: 'dog', data: 'cute' }
```

<h3>Deleting data</h3>

To delete data we can use the `delete` or `findAndDelete` functions.

```js
// Delete an document
db.delete('dog'); // true

// Find and delete a document
db.findAndDelete(element => typeof element.data === 'number' && element.data >= 1000); // [ { key: 'number', data: 1000 } ]
```

<h3>Cleaning up the database and deleting the file</h3>

To clear all data from the database we can use the `clear` method, and to delete the file from the database we can use the `unlink` method.

```js
// Clear the database
db.clear();

// Unlink the database file path
db.unlink();
```

<h1 align="center">Documentation</h1>

<p>To see the documentation for this project and see more examples of how to use it, check out the <a href="https://github.com/emptydev1/dynamicdb/blob/master/docs">GitHub repository</a>.</p>

<h1 align="center">Contribution guidelines</h1>

<p>Contributions are always welcome! If you find a bug or would like to suggest a new feature, open an issue at<o> <a href="https://github.com/emptydev1/dynamicdb/issues">GitHub</a></o>. If you would like to contribute to this project, fork the repository and submit a pull request.</p>

<h1 align="center">License</h1>

<p>DynamicDB is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, version 2.0</a>. See <a href="https://github.com/emptydev1/dynamicdb/blob/main/LICENSE">LICENSE</a> for full license text.</p>
