import React from 'react'

const Header = ({courseName}) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({parts}) => {
  console.log('Content:', parts)
  return (
    <div>
      {parts.map(part => <Part part={part} />)}
    </div>
  )
}

const Part = ({part}) => {
  console.log('Part:', part)
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts.map(part => part.exercises).reduce((a, b) => a + b)}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App