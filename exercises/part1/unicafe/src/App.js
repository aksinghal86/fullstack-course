// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
// Exercise 1.6, 1.7

import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Totals = ({ total, text }) => <div>{text} {total}</div>
const Average = ({ reviews }) => {
  const numerator = reviews[0] + reviews[1]*0 + reviews[2]*-1
  const denominator = reviews[0] + reviews[1] + reviews[2]
  if (denominator === 0) { 
    return (
      <div>
        average no reviews have been submitted yet
      </div>
    )
  }
  return (
    <div>
      average {numerator/denominator}
    </div>
  )
}

const PositivePct = ({ reviews }) => {
  const numerator = reviews[0]
  const denominator = reviews[0] + reviews[1] + reviews[2]
  
  if (denominator === 0) { 
    return (
      <div>
        positive no reviews have been submitted yet
      </div>
    )
  }
  return (
    <div>
      positive {numerator/denominator*100}%
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGoodByOne} text='good'/>
      <Button handleClick={increaseNeutralByOne} text='neutral'/>
      <Button handleClick={increaseBadByOne} text='bad'/>
      <h1>statistics</h1>
      <Totals total={good} text='good'/>
      <Totals total={neutral} text='neutral'/>
      <Totals total={bad} text='bad'/>
      <Average reviews={[good, neutral, bad]}/>
      <PositivePct reviews={[good, neutral, bad]} />
    </div>
  )
}

export default App