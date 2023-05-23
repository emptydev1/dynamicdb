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

<p>To install and use this dependency on your machine, run the following command in your terminal:</p>

```
$ npm install dynamicdb
```

<h1 align="center">Basic usage</h1>

<h2>Using SQLite:</h2>

```js
const db = require('dynamicdb').sqlite();
```

<h2>Using BSON:</h2>

```js
const db = require('dynamicdb').bson();
```

__

```js
// Saving a data
db.insert('person', { name: 'John Doe', age: 28 });

// Getting data
db.get('person.name') // John Doe
db.get('person.age') // 28

// Adding a value
db.add('person.age', 1) // 29
```

**Note:** If you want to see more examples, see the documentation for this project.

<h1 align="center">Documentation</h1>

<p>To see all the documentation for this project and see basic examples of how to use it, just access the repository of <o><a href="https://github.com/emptydev1/dynamicdb/blob/master/docs">GitHub</a></o>.</p>

<h1 align="center">Contribution guidelines</h1>

<p>Contributions are always welcome! If you find a bug or would like to suggest a new feature, open an issue at<o> <a href="https://github.com/emptydev1/dynamicdb/issues">GitHub</a></o>. If you would like to contribute to this project, fork the repository and submit a pull request.</p>

<h1 align="center">License</h1>

<p>DynamicDB is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, version 2.0</a>. See <a href="https://github.com/emptydev1/dynamicdb/blob/main/LICENSE">LICENSE</a> for full license text.</p>
