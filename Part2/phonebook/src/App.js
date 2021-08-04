import React, {useState, useEffect} from 'react'

import Persons from "./components/Persons"
import AddPerson from "./components/Form_addNew"
import Filter from "./components/Filter"

import personService from './services/persons'

const App = () => {
  // #region States
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('01-02-');

  const [filter, setFilter] = useState('');
  // #endregion States

  useEffect(() => {
    console.log('effect');
    personService.getAll()
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      });
  }, []);


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name).includes(newName)) {
      window.alert('"' + newName + '" is already in the phonebook')
      setNewName('')
      return
    };

    const personObj = {
      name: newName,
      number: newNumber
    };

    personService.create(personObj)
      .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
      });

    
    setNewNumber('01-02-')
  };


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  };

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Add new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />

    </div>
  )
}

export default App