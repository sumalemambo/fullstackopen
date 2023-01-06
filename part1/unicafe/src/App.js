import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text, quantity}) => {
  return (
    <div>
      {text} {quantity}
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good/all * 100

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>

    )
  }
  return (
    <div>
      <StatisticsLine text="good" quantity={good}/>
      <StatisticsLine text="neutral" quantity={neutral}/>
      <StatisticsLine text="bad" quantity={bad}/>
      <StatisticsLine text="all" quantity={all}/>
      <StatisticsLine text="average" quantity={average}/>
      <StatisticsLine text="positive" quantity={positive.toString().concat(" ", "%")}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" onClick={() => setGood(good + 1)}/>
        <Button text="neutral" onClick={()  => setNeutral(neutral + 1)}/>
        <Button text="bad" onClick={() => setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App