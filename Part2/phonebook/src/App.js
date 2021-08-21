import React, {useState, useEffect} from 'react'

import Persons from "./components/Persons"
import AddPerson from "./components/Form_addNew"
import Filter from "./components/Filter"
import Notifications from "./components/Notification"

import personService from './services/persons'

const App = () => {
  // #region States
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

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

    // Find if the person already exists
    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      // Do we want to update the number
      if (!window.confirm('"' + newName +
        '" is already in the phonebook! Do you want to replace the old number with the new one?')) {
        setNewName('')
        setNewNumber('01-02-');
        return;
      }

      const existingPersonObj = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
      const personObj = {name: newName, number: newNumber}

      personService
        .update(existingPersonObj.id, personObj)
        .then(response => {
          personService.getAll()
            .then(response => {
              setPersons(response.data);
            })
        })
        .catch(error => {
          setErrorNotification(
            'Information of "' + personObj.name + '" has already been removed from server'
          );
          personService.getAll()
            .then(response => {
              setPersons(response.data);
            });
          setTimeout(() => {
            setErrorNotification(null)
          }, 5000);
        });
    }
    else { // Create fully new entry
      const personObj = {name: newName, number: newNumber}
      personService.create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotification('Added ' + response.data.name);
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(err => {
          console.log('Create Person error', err.response.data.error);
          setErrorNotification(err.response.data.error);
          setTimeout(() => {
            setErrorNotification(null);
          }, 5000);
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
      <Notifications.Notification message={notification} />
      <Notifications.ErrorNotification message={errorNotification} />
      <Filter filter={filter} onChange={handleFilterChange} />

      <h2>Add new</h2>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />

    </div>
  )
}

export default App