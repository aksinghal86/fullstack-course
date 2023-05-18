import Name from './Name';

const Persons = ({ persons, deletePerson }) => {
    return(
      <div>
        {persons.map(person =>
          <Name 
            key={person.id} 
            name={person.name} 
            number={person.number} 
            deletePerson={() => deletePerson(person.id)} 
          />
        )}
      </div>
    )
  }

  export default Persons;