// https://fullstackopen.com/en/part2/forms
// Exercises 2.6, 2.7, 2.8, 2.9, 2.10

import { useState } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = {
        name: newName, 
        number: newNumber, 
        id: persons.length+1
      }
      setPersons(persons.concat(nameObject))
      setShowPerson(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowPerson = (event) => {
    setShowPerson(
      persons.filter(person => 
        person.name.toLowerCase().includes(
          event.target.value.toLowerCase())
      )
    )
  }

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter onPersonChange={handleShowPerson} />
      <h2>Add a New Person</h2>
      <PersonForm 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
        onClick={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={showPerson} />
    </div>
  )
}

export default App;
