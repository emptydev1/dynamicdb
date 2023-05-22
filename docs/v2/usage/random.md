# Random methods

Below are some methods that are random, but that might end up being useful in some way.

```js
// Entering data
db.insert('person', {
  name: 'John Doe',
  married: true,
  age: 23,
  hobbies: [ 'program', 'study' ],
  platform: 'mobile',
  email: 'johndoe@example.com',
  password: 'john_doe3870'
})

// Getting the type of a document
db.type('person.married') // boolean
db.type('person.hobbies') // object

// Converting database data into a buffer
db.toBuffer() // <Buffer ...>

// Converting database data to a string
db.stringify() // '[...]'

// An array with the keys of all documents already inserted
db.keys()

// Get the options that were provided for this instance
db.options

// Get latency in milliseconds from database
db.ping

// Get how much data has already been entered into the database
db.size
```
