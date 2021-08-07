import React, {useState, useEffect} from 'react'

import Persons from "./components/Persons"
import AddPerson from "./components/Form_addNew"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

import personService from './services/persons'

const App = () => {
  // #region States
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);

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
    },
    []);


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      if (!window.confirm('"' + newName +
            '" is already in the phonebook! Do you want to replace the old number with the new one?')) {
        setNewName('')
        setNewNumber('01-02-');
        return;
      }

      const personObj = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
      personObj.number = newNumber;

      personService.update(personObj)
        .then(response => {
          personService.getAll()
            .then(response => {
              setPersons(response.data);
            });
        });
    }
    else {
      const personObj = {name: newName, number: newNumber}
      personService.create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotification('Added ' + response.data.name);
          setTimeout(() => {
              setNotification(null);
            }, 2000);
        })
    };

    setNewName('');
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

  const handleDelete = (person) => {
    console.log('handleDelete', person);
    if (!window.confirm('Delete ' + person.name + '?')) {
      return;
    }

    personService.deleteEntry(person.id)
      .then(response => {
        personService.getAll()
          .then(response => {
            setPersons(response.data);
          })
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Add new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>

    </div>
  )
}

export default App