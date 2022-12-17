// Header component
const HeaderCourse = (props) => {
  // Use props to pass the contents
  // to the function.
  
  return (
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

// Content component
const Content = (props) => {
  // Use props to pass the contents
  // to the function.

  return (
    <div>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </div>
  )
}

// Total component
const Total = (props) => {
  // Use props to pass number of exercices
  // to the function.

  return (
    <div>
      <p>
        Number of exercices {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <HeaderCourse courseName={course}/>
      <p>HOLAAA</p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}

export default App