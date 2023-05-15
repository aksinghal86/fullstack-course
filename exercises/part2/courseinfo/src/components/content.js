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
  console.log(content)
  return (
    <div> 
      <Header name={content.name}/>
      {content.parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
      <Total parts={content.parts} />
    </div>
  )
}

const Course = ({ courses }) => {
  return(
    <div>
      {courses.map(content => <Content key={content.id} content={content} />)}
    </div>
  )
}

export default Course