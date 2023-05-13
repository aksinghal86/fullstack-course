// https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps
// Exercise 1.6, 1.7

import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Totals = ({ reviews }) => {
  return (
    <div>
      <div>good: {reviews.good}</div>
      <div>neutral: {reviews.neutral}</div>
      <div>bad: {reviews.bad}</div>
    </div>
  )
}

const Average = ({ reviews }) => {
  const numerator = reviews.good + reviews.bad*-1
  const denominator = reviews.good + reviews.neutral + reviews.bad
  
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
  const numerator = reviews.good
  const denominator = reviews.good + reviews.neutral + reviews.bad
  
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
  
  const reviews = {
    good: good, neutral: neutral, bad: bad
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGoodByOne} text='good'/>
      <Button handleClick={increaseNeutralByOne} text='neutral'/>
      <Button handleClick={increaseBadByOne} text='bad'/>
      <h1>statistics</h1>
      <Totals reviews={reviews} text='good'/>
      <Average reviews={reviews} />
      <PositivePct reviews={reviews} />
    </div>
  )
}

export default App