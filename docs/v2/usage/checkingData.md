# Checking data

We can check if a document exists through its key, for that, we can use the `exists` or `has` method which work in the same way.

```js
// Entering data 
db.insert('dog', 'cute')

console.log(db.exists('dog')) // true
console.log(db.exists('cat')) // false 
```
