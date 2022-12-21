// Header Component
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

// Part component
const Part = (props) => {
  return (
    <div>
      <p> {props.part} {props.exercices} </p>
    </div>
  )
}

// Content component
const Content = (props) => {
  return (
    <div>
      <Part part={props.part1} exercices={props.exercices1} />
      <Part part={props.part2} exercices={props.exercices2} />
      <Part part={props.part3} exercices={props.exercices3} />
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />

      <Content part1={part1.name} exercices1={part1.exercises} part2={part2.name}
       exercices2={part2.exercises} part3={part3.name} exercices3={part3.exercises} />

      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

export default App