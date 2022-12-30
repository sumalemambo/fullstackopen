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



*/

import { useState } from 'react'

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

export default App;
