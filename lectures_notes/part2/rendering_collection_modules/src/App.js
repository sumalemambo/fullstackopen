/*
# Rendering a collection, modules

# Rendering collections

The file index.js looks like this:

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)

And App.js like this:

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul>
    </div>
  )
}

export default App

A single note is rendered by accessing the objects in the array by
referring to a hard-coded index number:

<li>{notes[1].content}</li>

We can improve on this by generating React elements from the array
objects using the map function:

notes.map(note => <li>{note.content}</li>)

The result is an array of li elements

[
  <li>HTML is easy</li>,
  <li>Browser can execute only JavaScript</li>,
  <li>GET and POST are the most important methods of HTTP protocol</li>,
]

which can be placed inside ul tags:

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => <li>{note.content}</li>)}
      </ul>
    </div>
  )
}

We will also make the code more readable by separating the arrow's function
declaration across multiple lines:

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

# Key-atribute

Even though the application is working, there is a nasty warning in the console.
As the linked React page in the error message suggests; the list items, i.e the elements
generated by the map method, must have a unique key value: an attribute called key.

Let's add the keys:

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

And the error message disappears.

React uses the key attributes of objects in an array to determine how
to update the view generated by a component when the component is re-rendered

# Map






*/

const App = (props) => {
  const { notes } = props

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
