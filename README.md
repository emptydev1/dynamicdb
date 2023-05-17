<h1 align="center">DynamicDB</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/dynamicdb.svg" alt="npm version">
  <img src="https://img.shields.io/npm/dt/dynamicdb.svg" alt="npm downloads">
  <img src="https://img.shields.io/github/license/emptydev1/dynamicdb.svg" alt="license">
</p>

<p>DynamicDB is a database produced using Node.js and stored in BSON format, offering high performance and scalability.</p>

<h1 align="center">Features</h1>

- High performance and scalability 
- Stores data in BSON format
- Easy to use and returns responses quickly

<h1 align="center">Instalation</h1>

<p>To install the dependency in your project, you can run one of the following commands in your terminal:</p>

```sh-session
npm install dynamicdb
yarn add dynamicdb
```

<h1 align="center">Usage</h1>

<h3>Creating a new database</h3>

```js
import { BSONDatabase } from 'dynamicdb';

const db = new BSONDatabase({
  file: './database/data.bson'
}):
```

In these examples we use the BSONDatabase class to create a new database that uses the `./database/data.bson` file to store data.

<h3>Entering data</h3>

You can use the `insert` function to insert a single document or the `insertMany` function to insert multiple documents at once.

```js
// Insert or edit a document
db.insert('dog', 'cute');

// Insert multiple documents
db.insertMany([
  { number: 1000 },
  { money: 100 }
]);
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
db.findAndDelete(element => element.data >= 1000); // [ { key: 'number', data: 1000 } ]
```

<h3>Cleaning up the database and destroying the connection</h3>

To clear all data from the database we have the `clear` function, and to destroy the connection we can use the `close` method, which deletes the file.

```js
// Clear the database
db.clear();

// Unlink the database file path
db.close();
```

<h1 align="center">Contribution guidelines</h1>

<p>Contributions are always welcome! If you find a bug or would like to suggest a new feature, open an issue at<o> <a href="https://github.com/emptydev1/dynamicdb/issues">GitHub</a></o> . If you would like to contribute to this project, fork the repository and submit a pull request.</p>

<h1 align="center">License</h1>

<p>DynamicDB is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License, version 2.0</a> . See <a href="https://github.com/emptydev1/dynamicdb/blob/main/LICENSE">LICENSE</a> for full license text.</p>
