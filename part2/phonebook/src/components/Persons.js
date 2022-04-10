import Person from './Person'

const Persons = ({ persons, deletePersonById }) => {
    return(
        <div>
            {persons.map(person =>
                <Person key={person.id} person={person} deletePersonById={() => deletePersonById(person.id)}/>
            )}
        </div>    
    )
}

export default Persons