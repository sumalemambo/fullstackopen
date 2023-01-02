/*
# Complex state

In our previous example the application state was
simple as it was comprised of a single integer.

¿What if our application requires a more complex
state?

In most cases the easiest and best way to accomplish
this is by using the useState function multiple times
to create separate "pieces" of state.

In the following code we create two pieces of state
for the application named left and right that both
get the initial value of 0.

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick={() => {setLeft(left + 1)}}>
        left
      </button>
      <button onClick={() => {setRight(right + 1)}}>
        right
      </button>
      {right}
    </div>
  )
}

The component get access to the functions setLeft and
setRight that it can use to update the two pieces of state.

The component's state or a piece of its state can be of any
type. We could implement the same functionality by saving the
click count of both left and right buttons into a single object:

{
  left: 0,
  right: 0
}

In this case the application would look like this:

import { useState } from 'react'

const App = () => {
  const [ clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
    </div>
  )
}

Now the component only has a single piece of state and
the events handlers have to take care of chaning the 
entire application state.

We can define the new state object a bit more neatly by
using the object spread syntax:

const App = () => {
  const [ clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {clicks.right}
    </div>
  )
}

In practice {...clicks} creates a new object that
has copies of all of the properties of the clicks object.
When we specify a particular property - e.g right in
{...clicks, right: 1}, the value of the right property
in the new object will be 1.

In the examples above this:

{...clicks, right: clicks.right + 1}

creates a copy of the clicks object where the value of the
right property is increased by one.

Assigning the object to a variable in the event handlers is
not necessary and we can simplify the functions to the 
following form:

const handleLeftClick = () => {
  setClicks({...clicks, left: clicks.left + 1})
}

const handleRightClick = () => {
  setClicks({...clicks, right: clicks.right + 1})
}

Some readers might wonder why we didn't just update the
state directly, like this:

const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}

The application appears to work. However, it is forbidden
in React to mutate state directly since it can result in
unexpected side effects.

Storing all the state into a single object is a bad choice
for this particular application. There's no apparent benefit
and the resulting application is a lot more complex. In this
case storing the click counters into separate pieces of state
is a far more suitable choice.

For more guidance visit:

https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables

# Handling arrays

Let's add a piece of state to our application containing an array
allClicks that remembers every click that has occurred in the
application.

const App = () => {
  const [left, setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

Every click is stored into a separate piece of state called
allClicks that is initialized as an empty array:

const [allClicks, setAll] = useState([])

Adding the new item to the array is accomplished with the
concat method, that does not mutate the existing array but
rather returns a new copy of the array with the item added
to it.

As mentioned previously, it's also possible in Javascript
to add items to an array with the push method. If we add
the item by pushing it to the allClicks array and then
updating the state, the application would still appear to
work:

const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}

However, don't do this. As mentioned previously, the state
of React components like allClicks must not be mutated
directly.

# Conditional rendering

Let's modify our application so that the rendering of the
clicking history is handled by a new History component:

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  else {
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>
        left
      </button>
      <button onClick={handleRightClick}>
        right
      </button>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

Let's make on last modification to our application by
refactoring it to use the Button component that we defined
earlier on:

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  else {
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right,setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

# Debugging React Applications

# Rules of Hooks

The are a few limitations and rules we have to follow to
ensure that our application uses hooks-based state functions
correctly.

The useState function (as well as the useEffect function
introduced later on in the course) must NOT be called from
inside of a loop, a conditional expression, or any place
that is not a function defining a component.

To recap, hooks may only be called from the inside of a
function body that defines a React component:

const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}

# Event handling revisited

Let's assume that we're developing this simple application with
the following component App:

const App = () => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button>reset to zero</button>
    </div>
  )
}

We want the clicking of the button to reset the state stored in
the value variable.

In order to make the button react to a click event, we have to
add an event handler to it.

Event handlers must always be a function or a reference to a
function. The button will not work if the event handler is
set to a variable of any other type.

If we were to define the event handler as a string:

<button onClick="crap...">button</button>

React would warn us about this in the console:

index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `string` type.
    in button (at index.js:20)
    in div (at index.js:18)
    in App (at index.js:27)

The following attemp would also not work:

<button onClick={value + 1}>button</button>

We have attempted to set the event handler to value + 1 which simply
returns the result of the operation. React will kindly warn us about
this in the console:

index.js:2178 Warning: Expected `onClick` listener to be a function, instead got a value of `number` type.

This attempt would not work either:

<button onClick={value = 0}>button</button>

The event handler is not a function but a variable assignment, and
React will once again issue a warning to the console. This attempt
is also flawed in the sense that we must never mutate state directly
in React.

What about the following:

<button onClick={console.log('clicked the button')}>
  button
</button>

The message gets printed to the console once when the component
is rendered but nothing happens when we click the button. Why does
this not work even when our event handler contains a function 
console.log?

The issue here is that our event handler is defined as a function
call which means that the event handler is assigned the returned
value from the function, which in the case of console.log is
undefined.

The following attempt is flawed as well:

<button onClick={setValue(0)}>button</button>

We have once again tried to set a function call as the event handler.

Executing a particular function call when the button is clicked can
be accomplished like this:

<button onClick={() => console.log('clicked the button')}>
  button
</button>

Now the event handler is a function defined with the arrow
function syntax () => {console.log('clicked the button')}
When the component gets rendered, no function gets called
and only the reference to the arrow function is set to the
event handler.

We can implement resetting the state in our application
with this same technique:

<button onClick={() => setValue(0)}>
  reset
</button>

Defining the handlers directly in the attribute is not
necessarily the best possible idea.

You will often see event handlers defined in a separate
place:

const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
  }

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}

# A function that returns a function

Another way to define an event handler is to use a function that
returns a function.

Lets make the following changes to our code:

const App = () => {
  const [value, setValue] = useState(10)

  const hello = () => {
    const handler = () => console.log('hello world')
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}

Whats the point of this concept?

Let's change the code a tiny bit:

const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

Functions returning functions can be utilized in defining generic
functionality that can be customized with parameters. 

Our current definition is slightly verbose:

const hello = (who) => {
  const handler = () => {
    console.log('hello', who)
  }
  return handler
}

Let's eliminate helper variables and directly return the created function

const hello = (who) => {
  return () => {
    console.log('hello', who)
  }
}

Since our hello function is composed of a single return command, we can
omit the curly braces and use the more compact syntax for arrow functions:

const hello = (who) => 
    () => {
    console.log('hello', who)
  }

Lastly, let's write all of the arrows on the same line:

const hello = (who) => () => {
    console.log('hello', who)
}

We can use the same trick to define event handlers that set the state of
the component to a given value. Let's make the following changes to our
code:

const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => () => {
      console.log('hello', who)
  }
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

Using functions that returns functions is not required to achieve
this functionality. Let's return the setValue function which is
responsible for updating state into a normal function:

const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button>
    </div>
  )
}

Choosing between the two presented ways of defining your event handlers
is mostly a matter of taste.

# Passing event handlers to child components

Lets extract the button into its own component:

const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand"/>
      <Button onClick={() => setToValue(0)} text="zero"/>
      <Button onClick={() => setToValue(value + 1)} text="increment"/>
    </div>
  )
}

# Do not define components within components

Let's start displaying the value of the application in it's Display
component. We will change the application by defining a new component
inside of the App component.

*/

import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  else {
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
  }
}

const Button = (props) => (
  <div>
    <button onClick={props.onClick}>
      {props.text}
    </button>
  </div>
)

const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      {value}
      <Button onClick={() => setToValue(1000)} text="thousand"/>
      <Button onClick={() => setToValue(0)} text="zero"/>
      <Button onClick={() => setToValue(value + 1)} text="increment"/>
    </div>
  )
}

export default App;
