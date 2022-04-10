import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: 0, id: 0 }]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({message: null, success: false})

    useEffect(() => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
      }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (!persons.some(person => person.name === newName)) {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
                setNotification(
                    {message: `Added ${personObject.name}`, success: true}
                  )
                  setTimeout(() => {
                    setNotification({message: null, success: false})
                  }, 5000)  
        } else {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(person => person.name === newName)
                const id = person.id
                const changedPerson = { ...person, number: newNumber }
                
                personService
                    .update(person.id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotification(
                            {message: `Changed ${changedPerson.name}'s phone number to ${changedPerson.number}`, success: true}
                            )
                            setTimeout(() => {
                                setNotification({message: null, success: false})
                            }, 5000) 
                    })
                    .catch(error => {
                        setNotification(
                            {message: `the person '${person.name}' was already deleted from server`, success: false}
                            )
                            setTimeout(() => {
                                setNotification({message: null, success: false})
                            }, 5000) 
                        setPersons(persons.filter(person => person.id !== id))
                        setNewName('')
                        setNewNumber('')
                    })

                
            }
        }
    }

    const deletePersonById = (id) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`)){
            personService
                .deletePersonById(id)
            setPersons(persons.filter(person => person.id !== id))
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

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = filter === ''
        ? persons
        : persons.filter(person => person.name.toUpperCase().startsWith(filter.toUpperCase()) )


    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification} />
            <Filter filter={filter} onChange={handleFilterChange}/>
            <form onSubmit={addPerson}>
                <div>name: <input value={newName} onChange={handleNameChange}/></div>
                <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePersonById={deletePersonById}/>
        </div>
    )
}

export default App