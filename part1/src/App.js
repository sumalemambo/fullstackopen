// Header Component
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Content component
const Content = (props) => {
  return (
    <div>
      <p> {props.part} {props.exercices}</p>
    </div>
  )
}

// Total component
const Total = (props) => {
  return (
    <div>
      <p> Number of exercices {props.exercises1 + props.exercises2 + props.exercises3}</p>
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
      <Header course={course} />

      <Content part={part1} exercices={exercises1} />
      <Content part={part2} exercices={exercises2} />
      <Content part={part3} exercices={exercises3} />

      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App