# Getting data

To obtain data that were previously inserted into the database, we can use the `get` or `find` method.

```js
// Entering data...
db.insertMany({
  person: { name: 'John Doe', age: 27 }
})

// Get a value from your key
db.get('person') // { name: 'John Doe', age: 27 }

// ...
console.log('Hello! My name is %s and I am %s years old.', ...Object.values(db.get('person')))

// Searching a document through a callback
db.find((element) => element.key === 'person' && element.value.name === 'John Doe') // { name: 'John Doe', age: 27 }
```

So that we can get all the data already inserted in the database, we can use the `values` or `toArray` method.

```js
// Returns an array of database documents
console.log(db.toArray()) // Array { ... }

// Returns a JSON object containing the data
console.log(db.values()) // Object { ... }
```
