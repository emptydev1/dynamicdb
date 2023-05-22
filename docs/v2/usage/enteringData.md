# Entering data

To be able to insert or update existing data we can use functions like `insert`, `insertMany`, `set` or `fetch`.

```js
// Inserting a single document
db.insert('person', {}) // {}
// or db.set

// Editing an existing document
db.insert('person.name', 'John Doe') // John Doe

// Inserting multiple documents at once
db.insertMany({
  cat: {
    name: 'Garfield',
    age: 2,
    birthday: '01/02'
  },
  dog: {
    name: 'Charlie',
    age: 6,
    birthday: '04/03'
  }
}) // Object { ... }

// Looking for a value
db.fetch('bird', {
  name: 'Skylar',
  age: 4,
  birthday: '15/02'
})
```

**Note:** The `fetch` function looks for a value in the database, if it exists its value will be returned, otherwise it will insert a new document to the database.
