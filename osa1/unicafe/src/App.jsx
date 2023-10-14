import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.good == 0 && props.neutral == 0 && props.bad == 0) {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
      
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="average" value={(props.good-props.bad)/((props.bad + props.good + props.neutral))} />
          <StatisticLine text="positive" value={(props.good/((props.bad + props.good + props.neutral)))*100 + " %"} />
        </table>
      </div>
  )
  }
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addToGood = () => setGood(good + 1)

  const addToNeutral = () => setNeutral(neutral + 1)

  const addToBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addToGood} text='good' />
      <Button handleClick={addToNeutral} text='neutral' />
      <Button handleClick={addToBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App