import { useState, useEffect } from 'react'
import axios from 'axios'
import numeroluettelo from './services/persons'
const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else if(successMessage !== null) {
    return (
      <div className='success' >
      <br />
      <em>{successMessage}</em>
      </div>
    )
  } else {
  return (
    <div className='error' >
    <br />
    <em>{errorMessage}</em>
    </div>
  )
  }
}
const Filter = (props) => (
  <form>
        filter shown with: <input
                value={props.newFilter}
                onChange={props.handleFilterChange}
                />
      </form>
)

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>

        <div>
          name: <input
                  value={newName}
                  onChange={handlePersonChange}
                />
          
        </div>

        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                  />
        </div>

          <button type="submit">add</button>
      </form>
)

const Persons = ({ persons, handleDelete }) => (
  persons.map(person =>
    <div><p key={person.id}>{person.name} {person.number}</p><button id={person.id} onClick={handleDelete}>delete</button></div>
  )
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [successNotification, setSuccessNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)

  useEffect(() => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.includes(newFilter)
    );
    setPersonsToShow(filteredPersons);
  }, [newFilter, persons]);

  const hook = () => {
    console.log('effect')
    numeroluettelo
      .getAll()
      .then(response => {
        setPersons(persons.concat(response))
        setPersonsToShow(persons.concat(response))
      })
  }
  
  useEffect(hook, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(o => o.name === newName)
    if(person) {
      const updatedPerson = { ...person, number: newNumber }
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        numeroluettelo
          .update(person.id, updatedPerson)
          .then(response => {
            setSuccessNotification(`Updated ${newName}`)
            setPersons(persons.map(p => p.id != person.id ? p : updatedPerson))
            setPersonsToShow(persons.map(p => p.id != person.id ? p : updatedPerson))
            setTimeout(() => { 
              setSuccessNotification(null) 
            }, 5000)
          })
          .catch(error => {
            setErrorNotification(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => { 
              setErrorNotification(null) 
            }, 5000)
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      

      numeroluettelo
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setPersonsToShow(persons.concat(personObject));
          setSuccessNotification(`Added ${newName}`)
          setTimeout(() => { 
            setSuccessNotification(null) 
          }, 5000)
        })
        .catch(error => {
          console.log('create fail')
        })

        setNewName('')
        setNewNumber('')
        
    }
    
    
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const handleDelete = (e) => {
    const personId = e.target.id
    const deletingPerson = persons.find(person => person.id == personId)?.name

    if (window.confirm(`Delete ${deletingPerson}?`)) {
      numeroluettelo
        .remove(personId)
        .then(response => {
          setSuccessNotification(`Deleted ${deletingPerson}`)
          setPersons(persons.filter(person => person.id != personId))
          setPersonsToShow(personsToShow.filter(person => person.id != personId))
          setTimeout(() => { 
            setSuccessNotification(null) 
          }, 5000)
        })
        .catch(error => {
          console.log('delete fail')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successNotification} errorMessage={errorNotification} />
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2>Add a new name</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App