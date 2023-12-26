import { useState, useEffect } from 'react'

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

const Persons = ({ persons }) => (
  persons.map(person =>          
    <p key={person.name}>{person.name} {person.number}</p>
  )
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons);

  useEffect(() => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.includes(newFilter)
    );
    setPersonsToShow(filteredPersons);
  }, [newFilter, persons]);

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.find(o => o.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setNewName('')
      setNewNumber('')
      setPersons(persons.concat(personObject))
      setPersonsToShow(persons.concat(personObject));
    }
    
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <h2>Add a new name</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App