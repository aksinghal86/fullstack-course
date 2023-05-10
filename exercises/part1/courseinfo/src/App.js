// https://fullstackopen.com/en/part1/introduction_to_react
// Exercises 1.3

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => { 
  return(
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => { 
  // console.log(props)
  return(
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]} />
      <Part part={props.parts[1]} exercise={props.exercises[1]} />
      <Part part={props.parts[2]} exercise={props.exercises[2]} />
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total}</p>
  )
}
const App = () => {
  const course = "Half Stack application development"
  const part1 = {
    name: "Fundamentals of React", 
    exercises: 10
  }
  const part2 = {
    name: "Using props to pass data", 
    exercises: 7
  }
  const part3 = {
    name: "State of a component", 
    exercises: 14
  }
  
  const parts = [part1, part2, part3]

  return (
    <div> 
      <Header course={course} />
      <Content parts={[part1.name, part2.name, part3.name]} exercises = {[part1.exercises, part2.exercises, part3.exercises]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App