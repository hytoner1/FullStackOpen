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
      {parts.map(part => <Part part={part} key= {part.id} />)}
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
      <p>Total of {parts.map(part => part.exercises).reduce((a, b) => a + b)} exercises</p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <b>
        <Total parts={course.parts} />
      </b>
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => <Course course={course} key={course.id} />)}
    </div>
  )
}

export default Courses