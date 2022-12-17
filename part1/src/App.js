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

const Part = (props) => {
  // Use props to pass the paragraph
  // content to the function.

  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

// Content component
const Content = (props) => {
  // Use props to pass the contents
  // to the function.

  // Render each paragraph using the part component
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
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
      <Content part1={part1} exercises1={exercises1} part2={part2}
       exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App