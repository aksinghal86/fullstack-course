const PersonForm = (props) => {
    return(
      <form>
        <div>
          name: <input value={props.newName} onChange={props.onNameChange} />
          <br/>
          number: <input value={props.newNumber} onChange={props.onNumberChange} />
        </div>
        <div>
          <button type='submit' onClick={props.onClick}>add</button>
        </div>
    </form>
    )
  }

  export default PersonForm;