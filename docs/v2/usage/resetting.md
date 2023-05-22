# Resetting

We can reset the database data using the `clear` method.

```js
// Entering data...
db.insertMany({
  user: {
    name: 'John Doe',
    age: 34,
    email: 'johndoe@example.com',
    platform: 'mobile',
    money: '$ 3450'
  },
  books: [ 'Harry Potter' ]
})

// Getting entered data
console.log(db.toArray()) // Object { ... }

// Clearing all data
db.clear()

// ...
console.log(db.toArray()) // []
```

To delete the database file where the data is being stored we can use the `unlink` method. Remember to be careful when using this method as lost data cannot be recovered.

```js
// ...
db.unlink()
```

**(SQLITE-ONLY)** This method terminates the database connection to sqlite.

```js
db.close()
```
