# Math

It is possible to use some functions to perform basic mathematical expressions, such as: `math`, `sum`, `sub` and etc...

```js
// Inserting a new document...
db.insert('number', 0)

// Performing a mathematical expression with the variable "number"
db.math('number', '+', 100) // 100

// Adding an amount to the "number" variable
db.add('number', 400) // 500

// Subtracting an amount from the variable "number"
db.sub('number', 250) // 250

// Dividing the value of the variable "number"
db.divide('number', 5) // 50

// Multiplying the variable "number"
db.multi('number', 5) // 250
```
