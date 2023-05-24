// https://fullstackopen.com/en/part2/forms
// Modified based on the model solution

import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [info, setInfo] = useState({ message: null })

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const notifyWith = (message, type='info') => { 
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo( {message: null} )
    }, 3000)
  }
  
  const cleanForm = () => { 
    setNewName('')
    setNewNumber('')
  }
  
  const updateNumber = (person) => {
    const ok = window.confirm(
      `${person.name} is already added to phonebook. Replace the old number with a new one?`
    )
    const updatedPerson = { ...person, number: newNumber}

    if (ok) {
      phonebookService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          notifyWith(`${person.name} updated in server.`)
        })
        .catch(() => {
          notifyWith(`${person.name} has already been removed from server.`, 'error')
        })
        
        cleanForm()
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (person) {
      updateNumber(person)
      return
    } 
    const personObject = {
      name: newName, 
      number: newNumber
    }
    phonebookService
      .addPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notifyWith(`${returnedPerson.name} added!`)
      })
      .finally(() => {
        cleanForm()
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const ok = window.confirm(`delete ${person.name}?`)
    if ( ok ) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const byFilterField = p => p.name.toLowerCase().includes(filter.toLowerCase())
  const personsToShow = filter ? persons.filter(byFilterField) : persons

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification info={info} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a New Person</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
