const PersonForm = ({nombre, numero, changeNombre, changeNumero, onSubmit}) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
      name: <input value={nombre} onChange={changeNombre}/>   
      </div>
      <div>

        number: <input value={numero} onChange={changeNumero}/>   
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form >
  )
}

export default PersonForm