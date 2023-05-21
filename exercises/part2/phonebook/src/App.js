// https://fullstackopen.com/en/part2/forms
// Exercises 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15, 2.16, 2.17

import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personStatus, setPersonStatus] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
        setShowPerson(initialPhonebook)
      })
  }, [])
  
  const updateNumber = (person) => {
    const alertMessage = `${person.name} is already added to phonebook. Replace the old number with a new one?`
    const updatedPerson = { ...person, number: newNumber}

    if (window.confirm(alertMessage)) {
      phonebookService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setShowPerson(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setPersonStatus('success')

          setMessage(
            `${person.name} updated in server.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `Information of ${person.name} has already been removed from server.`
          )
          setPersonStatus('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          window.location.reload(false)
        })
        .finally(() => {
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (person) {
      updateNumber(person)
    } else {
      const personObject = {
        name: newName, 
        number: newNumber
      }
      phonebookService
        .addPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setShowPerson(persons.concat(returnedPerson))
          setPersonStatus('success')

          setMessage(
            `${personObject.name} added to server.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .finally(() => {
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`delete ${person.name}?`)) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setShowPerson(persons.filter(person => person.id !== id))
        })
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
      <Notification message={message} status={personStatus} />
      <Filter onPersonChange={handleShowPerson} />
      <h2>Add a New Person</h2>
      <PersonForm 
        newName={newName} 
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
        onClick={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={showPerson} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
