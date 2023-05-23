# Arrays

Arrays are one of the most important forms of data storage, being able to store several elements in a single document.

```js
db.insert('array', []) // not required

// Adding elements to the "array" document
db.push('array', 'item1', 'item2', 'item3', 'item4', 'item5')

// Splicing the array
db.splice('array', 0, 1) // [ 'item2', 'item3', 'item4', 'item5' ]

// Concatenate the array
db.concat('array', 'item 6', 'item 7', 'item 8')

// Pulling the array
db.pull('array', true, (element) => typeof element === 'string' && element.startsWith('item')) // []
```

There are also some methods that we can use to, for example, filter the database or map it.

```js
// Filtering the database values
db.filter((element) => element.value > 1000) // Array { ... }

// Mapping database values
db.map((element) => element.value) // Array { ... }

// Sorting database elements
db.sort((a, b) => b.value - a.value) // Array { ... }

// Executing a function for each document in the database
db.forEach((element) => {
  if (element.value <= 1000) db.delete(element.key)
})

// Shrinking database documents
db.reduce((a, b) => a.value + b.value, 0)
```
