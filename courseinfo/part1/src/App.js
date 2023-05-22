// https://fullstackopen.com/en/part1/introduction_to_react
// part 1A Introduction to React

import { useState } from 'react'

// const Display = ({ counter }) => <div>{counter}</div>
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const History = (props) => {
  if (props.allClicks.length === 0) { 
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Total = ({ total }) => <div>Total clicks: {total}</div>

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return ( 
    <div> 
      <p> 
        Hello {name}, you are {age} years old. So, you were probably born in {bornYear()}.
      </p> 
    </div>
  )
}

const App = () => {
  const [ left,  setLeft ] = useState(0)
  const [ right, setRight ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ allClicks, setAll ] = useState([])

  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  const friends = [
    {name: 'Pedro', age: 8 }, 
    {name: 'Josie', age: 10 }
  ]
  
  const increaseLeftByOne = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const increaseRightByOne = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }
  // const increaseLeftByOne = () => setClicks({...clicks, left: clicks.left + 1})
  // const increaseRightByOne = () => setClicks({...clicks, right: clicks.right + 1})
  // const setToZero = () => setClicks({left: 0, right: 0})

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )
  
  // debugger

  return (
    <div> 
      {/* <Display counter={left} /> */}
      {left}
      <Button handleClick={increaseLeftByOne} text='left' />
      {/* <Button handleClick={setToZero} text='zero both' /> */}
      <Button handleClick={increaseRightByOne} text='right' />
      {right}
      {/* <Display counter={right} /> */}
      {/* <p>Clicked: {allClicks.join(' ')}</p>
      <p>Total: {total}</p> */}
      <History allClicks={allClicks} />
      <Total total={total} />
      <Hello name={friends[0].name} age={friends[0].age}/>
      <Hello name={friends[1].name} age={friends[1].age} />
    </div>
  )
}


export default App 