import React from 'react';

const Person = ({person}) => {
  console.log('Person', person)
  return (
    <li
      key={person.name} >
      {person.name} &nbsp; {person.number}
    </li>
  )
};

const Persons = ({persons}) => {
  console.log('Persons', persons)
  return (
    <ul>
      {persons.map(person => <Person person={person} key={person.name} />)}
    </ul>
  )
};

export default Persons;