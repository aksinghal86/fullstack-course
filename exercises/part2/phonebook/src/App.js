// https://fullstackopen.com/en/part2/forms
// Exercises 2.6, 2.7, 2.8, 2.9, 2.10, 2.11

import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShowPerson(response.data)
      })
  }, [])

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
