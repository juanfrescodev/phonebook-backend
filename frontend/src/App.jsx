import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm' 
import Filter from './components/Filter'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }

  return (
    <div className={`notification ${message.type}`}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('') 
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({text: null, type: null})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })

  }, [])
 
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) =>{
    event.preventDefault()
    const nameExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExists){
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmUpdate){
        const updatePerson= {...nameExists, number: newNumber}
        personService
          .update(nameExists.id,updatePerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== nameExists.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage({
              text: `Updated number for ${newName} to ${newNumber}`, type: "green"
          })
            setTimeout(() => {
              setMessage({text:null, type:null})
            }, 5000)
          })
          .catch(error => {
            setMessage({text: `Information of ${newName} has already been removed from the server`, type: "red"})
            setTimeout(() => setMessage({text:null, type:null}), 5000)
          })
      }
    } else{

      const nameObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage({
              text:`Added ${newName} to the phonebook`, type:"green"
        })
            setTimeout(() => {
              setMessage({text:null, type:null})
            }, 5000)
        })
        .catch(error => {
          setMessage({text: `Could not add ${newName}`, type:"red"})
          setTimeout(() =>setMessage({text:null, type:null}), 5000)
        })
        
    }
  }

  const filteredPersons = filter === '' ? persons: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage({
              text:`Deleted ${person.name}`, type:"green"
            })
            setTimeout(() => {
              setMessage({text:null, type:null})
            }, 5000)
        })
        .catch(error => {
          setMessage({text:`information of ${person.name} has already been removed from the server`, type:"red"})
          setTimeout(() => setMessage({text:null, type:null}), 5000)
        })
      }    
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter value = {filter} onChange = {handleFilter} />
      <h2>Add a new</h2>
      <PersonForm 
        nombre = {newName}
        numero = {newNumber}
        changeNombre = {handleNewName}
        changeNumero = {handleNewNumber}
        onSubmit = {addName}/>
      
      <h2>Numbers</h2>
        <Persons 
        persons ={filteredPersons} 
        borrar ={deletePerson}
        />      
    </div>  

  )
}

export default App
