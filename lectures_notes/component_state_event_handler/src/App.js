/*
# Component helper functions

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

Lets expand our Hello component so that it guesses the year of birth of the
person being greeted

const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

The logic for guessing the year of birth is separated into a
function of its own that is called when the component is 
rendered. 

The person age does not have to be passed as a parameter to the
function, since it can directly access all props that are passed
to the component.

If we examine our current code closely, we'll notice that the helper
function is actually defined inside of another function that defines
the behaviour of our component. In Java programming defining a function
inside another one is complex and cumbersome, so not all that common.
In JavaScript, however, defining functions within functions is a
commonly used technique.

# Destructuring

In our previous code, we had to reference the data
passed to our component as props.name and props.age.
Of these two expressions we had to repeat props.age
twice in our code.

Since props is an object

props = {
  name: 'Arto Hellas',
  age: 35,
}

We can streamline our component by assigning the values
of the properties directly into two variables name
and age which we can then use in our code.

const Hello = (props) => {
  const name = props.name
  const age = props.age

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

Note that we've also utilized the more compact arrow functions
when defining the bornYear function. As mentioned earlier, if an
arrow function consists of a single expression, then the function
body does not need to be written inside curly braces. In this more
compact form, the function simply returns the result of the single
expression.

To recap, the two functions definition shown below are equivalent:

const bornYear = () => new Date().getFullYear() - age

const bornYear = () => {
  return new Date().getFullYear() - age
}

Destructuring makes the assigment of variables even easier, since
we can use it to extract and gather the values of an object's
properties into separate variables:

const Hello = (props) => {
  const { name, age } = props

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

If the object we are destructuring has the values

props = {
  name: 'Arto Hellas',
  age: 35,
}

the expression const { name, age } = props assigns
the value 'Arto Hellas' to name and 35 to age

We can take destructuring a step further:

const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

The props that are passed to the component are now
directly destructured into the variables name and age.

This means that instead of assigning the entire props
object into a variabled called props and then assigning
its properties into the variables name and age

const Hello = (props) => {
  const { name, age } = props
}

we assign the values of the properties directly to
variables by destructuring the props object that is
passed to the function as parameter:

const Hello = ({ name, age }) => {

# Page re-rendering

So far all of our applications have been such that
their appareance remains the same after the initial
rendering. What if we wanted to create a counter
where the value is increased as a function of time
or at the click of a button?

Let's start with the following. File App.js becomes:

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App

And file index.js becomes:

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App counter={counter} />
)

*/

const Hello = ({ name, age }) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App;
