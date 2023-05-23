# Deleting data

Sometimes it is necessary to delete some previously entered data, for that we can use functions like `delete`, `deleteMany` or `findAndDelete`.

```js
db.insertMany({
  cat: 'Luna',
  dog: 'Lucy',
  bird: 'Blue',
  person: {
    name: 'John Doe',
    age: 27,
    books: [ 'Harry Potter' ]
  }
})

// Deleting a single document
db.delete('cat') // true
db.delete('person.books') // true

// Deleting multiple documents
db.deleteMany('dog', 'bird', 'non-existent_document') // [ 'dog', 'bird' ]

// Searching and deleting documents
db.findAndDelete((element) => element.key === 'person' && element.value.name === 'John Doe') // Array { ... }
```
