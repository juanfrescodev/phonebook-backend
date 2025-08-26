const Persons = ({ persons, borrar }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => borrar(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons