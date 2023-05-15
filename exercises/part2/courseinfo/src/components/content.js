const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return(
    <p>
      <b>
        total of {total} exercises
      </b>
    </p>
  )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ content }) => {
  return (
    <div> 
      {content.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return(
    <div>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course