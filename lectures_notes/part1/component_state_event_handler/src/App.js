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

The App component is given the value of the counter via counter
prop. This component renders the value to the screen. What
happens when the value of counter changes? Even if we were to
add the following 

counter += 1

the component won't re-render. We can get the component to
re-render by calling the render method a second time,
e.g in the following way: (this goes in index.js)

let counter = 1

const refresh() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter={counter}/>
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()

The re-rendering command has been wrapped inside of the
refresh function to cut down on the amount of copy-pasted
code.

Now the component renders three times, first with the value
1, then 2, and finally 3. However, the values 1 and 2 are
displayed on the screen for such a short amount of time
that they can't be noticed.

We can implement a slightly more interesting functionality
by re-rendering and incrementing the counter every second
by using setInterval:

setInterval(() => {
  refresh()
  counter += 1
}, 1000)

Making repeated calls to the render method is not the
recommended way to re-render components. Next, we'll
introduce a better way of accomplishing this effect.

# Stateful component

All of our components up till now have been simple in
the sense that they have not contained any state that
could change during the lifecycle of the component.

Next, let's add state to our application's App
component with the help of React's state hook.

We will change the aplication as follows. index.js
goes back to 

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

and App.js changes to the following


import { useState } from 'react'

const App = () => {

  // Destructuring can use both {} or [], for array
  // we use []
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

export default App

In the first row, the file imports useState function

import { useState } from 'react'

The function body that defines the component begins
with the function call:

const [ counter, setCounter ] = useState(0)

The function call adds state to the component and
renders it initialized with the value of zero. The
function returns an array that contains two items.
We assign the items to the variables counter and
setCounter by using the destructuring assigment
syntax shown earlier.

The counter variable is assigned the initial value
of state which is zero. The variable setCounter is
assigned to a function that will be used to modify
the state.

The application calls the setTimeout function and
passes it two parameters: a function to increment
the counter state and a timeout of one second:

setTimeout(
  () => setCounter(counter + 1),
  1000
)

The function passed as the first parameter to the
setTimeout function is invoked one second after
calling the setTimeout function.

() => setCounter(counter + 1)

When state modifying function setCounter is called,
React re-renders the component which means that the
function body of the component function gets re-executed:

() => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}

The second time the component function is executed it calls
the useState function and returns the new value of the state: 1.
Executing the function body again also makes a new function call
to setTimeout, which executes the one second timeout and increments
the counter state again. Because the counter variable is 1,
incrementing the value by 1 is essentially the same as an
expression setting the value of counter to 2.

() => setCounter(2)

Meanwhile, the old value of counter - "1" is rendered to the screen

Every time the setCounter modifies the state it causes the component
to re-render. The value of the state will be incrementing again
after one second, and this will continue to repeat for as long
as the application is running.

If the component doesn't render when you think it should, or if it
render at the "wrong time", you can debug the application by logging
the values of the component's variables to the console. If we make
the following additions to our code:

const App = () => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  console.log('rendering...', counter)
  return (
    <div>{counter}</div>
  )
}

# Event handling

We have already mentioned event handlers that
are registered to be called when specific events
occur a few times in part 0.

Lets change the application so that increasing the
counter happens when a user clicks a button, which
is implemented with the button element.

Button elements support so-called mouse events, of
which click is the most common event. The click event
on a button can also be triggered with the keyboard
or a touch screen despite the name mouse event.

In React, registering an event handler function
to the click event happens like this:

const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}

We set the value of the button's onClick attribute
to be a reference to the handleClick function
defined in the code.

Now every click of the plus button causes the 
handleClick function to be called, meaning that
every click will log a clicked message to the browser
console.

The event handler function can also be defined
directly in the value assigment of the onClick
attribute.

const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => {console.log('clicked')}}>
        plus
      </button>
    </div>
  )
}

By changing the event handler to the following form:

<button onClick={() => {setCounter(counter + 1)}}>
  plus
</button>

we achieve the desired behavior, meaning that the value
of counter is increased by one and the component gets 
re-rendered.

Lets also add a button for resetting the counter:
const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => {setCounter(counter + 1)}}>
        plus
      </button>
      <button onClick={() => {setCounter(0)}}>
        zero
      </button>
    </div>
  )
}

# Event handler is a function

We define the event handlers for our buttons where
we declare their onClick attributes:

<button onClick={() => setCounter(counter + 1)}> 
  plus
</button>

What if we tried to define the event handlers in
a simpler form?

<button onClick={setCounter(counter + 1)}> 
  plus
</button>

This would completely break our application!

Whats going on? An event handler is supposed to
be either a function or a function reference, and
when we write:

<button onClick={setCounter(counter + 1)}>

the event handler is actually a function call. In
many situations this is ok, but not in this particular
situation. In the beginning the value of the counter
variable is 0. When React renders the component for
the first time, it executes the function call
setCounter(0 + 1), and changes the value of the
component's state to 1. This will cause the component
to be re-rendered, React will execute the setCounter
function call again, and the state will change leading
to another rerender...

Lets define the event handlers like we did before:

<button onClick={() => setCounter(counter + 1)}> 
  plus
</button>

The setCounter function is called only when a user
clicks the button.

Usually defining event handlers within JSX-templates
is not a good idea.

Lets separate the event handlers into separate functions:

const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {setCounter(counter + 1)}

  const setToZero = () => {setCounter(0)}

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}

# Passing state to child components

It's recommended to write React components that are
small and reusable across the application and even
across projects. Let's refactor our application so
that it's composed of three smaller components, one
component for displaying the counter and two components
for buttons.

Let's first implement a Display component that's
responsible for displaying the value of the counter.

One best practice in React is to lift the state up
in the component hierarchy. The documentation says:

Often, several components need to reflect the same changing data.
We recommend lifting the shared state up to their closest
common ancestor.

So let's place the application's state in the App component
and pass it down to the Display component through props:

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}


const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {setCounter(counter + 1)}

  const setToZero = () => {setCounter(0)}

  return (
    <div>
      <Display counter={counter}/>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}

Everything still works. When the buttons are clicked
the App gets re-rendered, all of its children including
the Display component are also re-rendered.

Next, let's make a Button component for the buttons of
our application. We have to pass the event handler as well
as the title of the button through the component's props:

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}

Our new App component looks like this:

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}


const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {setCounter(counter + 1)}
  const decreaseByOne = () => {setCounter(counter - 1)}
  const setToZero = () => {setCounter(0)}

  return (
    <div>
      <Display counter={counter}/>
      <Button 
        onClick={increaseByOne}
        text='plus'
      />
      <Button 
        onClick={setToZero}
        text='zero'
      />
      <Button
        onClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

# Changes in state cause rerendering

When the application starts, the code in App is executed. 
This code uses a useState hook to create the application state,
setting an initial value of the variable counter.
When one of the buttons is clicked, the event handler is executed.
The event handler changes the state of the App component with the
setCounter function. Calling a function which changes the state
causes the component to rerender.

So, if a user clicks the plus button, the button's event handler
changes the value of counter to 1, and the App component is
rerendered. This causes its subcomponents Display and Button
to also be re-rendered






*/
import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return(
    <div>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  )
}


const App = () => {

  // Destructuring can use both {} or []
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => {setCounter(counter + 1)}
  const decreaseByOne = () => {setCounter(counter - 1)}
  const setToZero = () => {setCounter(0)}

  return (
    <div>
      <Display counter={counter}/>
      <Button 
        onClick={increaseByOne}
        text='plus'
      />
      <Button 
        onClick={setToZero}
        text='zero'
      />
      <Button
        onClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

export default App