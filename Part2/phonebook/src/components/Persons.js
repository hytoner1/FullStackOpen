import React from 'react';

const Person = ({person, handleDelete}) => {
  console.log('Person', person)
  return (
    <li key={person.name}>
      {person.name}
      &nbsp; {person.number}
      &nbsp; <button onClick={() => handleDelete(person)}> delete </button>
    </li>
  )
};

const Persons = ({persons, handleDelete}) => {
  console.log('Persons', persons)
  return (
    <ul>
      {persons.map(person => <Person person={person} key={person.name} handleDelete={handleDelete}/>)}
    </ul>
  )
};

export default Persons;