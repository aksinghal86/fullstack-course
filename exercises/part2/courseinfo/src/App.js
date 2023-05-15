// https://fullstackopen.com/en/part2/rendering_a_collection_modules
// Exercises 2.1, 2.2, 2.3

import Course from './components/content'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }, 
      {
        name: 'Redux', 
        exercises: 11, 
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App