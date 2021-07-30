import React, {useState} from 'react'

const Person = ({person}) => {
  console.log('Person', person)
  return (
    <li key={person.name}>
      {person.name}
    </li>
  )
}

const Persons = ({persons}) => {
  console.log('Persons', persons)
  return (
    <ul>
      {persons.map(person => <Person person={person} key={person.name} />)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert('"' + newName + '" is already in the phonebook')
      setNewName('')
      return
    }

    const personObj = {
      name: newName
    }
    setPersons(persons.concat(personObj))
    setNewName('')
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        name: <input value={newName} onChange={handleNameChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Persons persons={persons} />

    </div>
  )
}

export default App