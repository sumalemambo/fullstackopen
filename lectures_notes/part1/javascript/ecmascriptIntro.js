/*

The official name of the Javascript standard is
ECMAScript. Browsers do not yet support all of
Javacript's newest features. Due to this fact,
a lot of code run in browsers has been transpiled
from a newer version of Javascript to an older,
more compatible version.

Today, the most popular way of doing transpiling is
by using Babel. Transpilation is automatically 
configured in React Aplications created with
create-react-app.

The code is written into files ending with .js
that are run issuing the command:

node name_of_file.js

*/

// # Variables
// In javascript there are a few ways to go about
// defining variables

const x = 1
let y = 5

console.log(x, y) // 1, 5 are printed
y += 10
console.log(x, y) // 1, 15 are printed
y = 'sometext'
console.log(x, y) // 1, sometext are printed
//x = 4 // causes an error

/*

const does not define a variable but a constant
for which the value can no longer be changed.
On the other hand, let defines a normal variable.

It is also possible to define variables in Javascript
using the keyword var. const and let were only
recently introduced in version ES6. The use of
var is ILL-ADVISED.

*/

// Arrays
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1]) // -1 is printed

t.forEach(value => {
    console.log(value) // numbers 1, -1, 3 and 5 ared printed, each to own line
})

/*

Notable in the previous example is the fact
that the contents of the array can be modified
even though it is defined as a const. Because
the array is an object, the variable always
points to the same object.

One way of iterating through the items of the
array is using forEach as seen in the example.

forEach receives a function defined using the
arrow syntax as a parameter.

forEach calls the function for each of the items
in the array, always passing the individual item
as an argument.

In the previous example, a new item was added to
the array using the method push. When using React,
techniques from functional programming are often used.
One characteristic of functional programming 
paradigm is the use of inmutable data structures.
In React code, it is preferable to use the method
concat, which does not add the item to the array,
but creates a new array in which the content of the
old array and the new item are both included

*/

// const t = [1, -1, 3]
t.pop()

const t2 = t.concat(5)

console.log(t) // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed

/*

There are plenty of useful methods defined for arrays.
Let's take at a short example of using the map method

*/

t.pop()
t.pop()
t.push(2, 3)

const m1 = t.map(value => value * 2)
console.log(m1) // [2, 4, 6] is printed

/*

Based on the old array, map creates a new array, for
which the function given as a parameter is used to
create the items. 

*/

// Map can also transform the array in something
// completely different

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)
// [ '<li>1</li>, <li>2</li>, <li>3</li>' ] is printed

// Individual items of an array are easy to assign
// to variables with the help of the destructuring
// assignment.

t.push(4, 5)
const [first, second, ...rest] = t

console.log(first, second) // 1, 2 is printed
console.log(rest) // [3, 4, 5] is printed

// # Objects
/*

There are a few ways of defining objects in Javascript.
One very common method is using object literals, which
happen by listing its properties within braces:

*/

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PHD',
}

const object2 = {
    name: 'Full stack web application development',
    level: 'Intermediate studies',
    size: 5
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },
    grades: [2, 3, 5, 3],
    deparment: 'Stanford University',
}

// The value of the properties can be any type
// like integers, strings, arrays, objects...

console.log(object1.name) // Arto Hellas is printed
const fieldName = 'age'
console.log(object1[fieldName]) // 35 is printed

// You can also add properties to an object on the fly
// by either using dot notation or brackets:

object1.address = 'Helsinki'
object1['secret number'] = 12341

// The latter of the aditions has to be done using brackets
// , because when using dot notation, 'secret number' is not
// a valid property name because of the space character
// Objects in Javascript can also have METHODS.

// # Functions

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result) // 6 is printed

// If there is a single parameter we can exclude parentheses
const square = p => {
    console.log(p)
    return p * p
}

// If the function contains a single expression we can exclude
// the braces
const square2 = p => p * p
console.log(square(3), square2(3)) // 9, 9 is printed

// The above form is useful when manipulating arrays
t.pop()
t.pop()

const tSquared = t.map(p => p * p)

console.log(tSquared)
// [1, 4, 9] is printed

// There are two ways to reference a function
// One is giving a name in a function declaration

function product(a, b) {
    return a * b
}

const resultProduct = product(2, 6)

console.log(resultProduct)
// Result is now 12

// The other way to define a function is using a function
// expression. In this case there is no need to give the
// function a name and the definition may reside among
// the rest of the code.

const average = function(a, b) {
    return (a + b) / 2
}

const resultAverage = average(2, 5)

console.log(resultAverage)
// Result is now 3.5
