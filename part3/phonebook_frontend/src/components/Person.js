const Person = ({ person, deletePersonById }) => {
    return (
      <div>{person.name} {person.number} <button onClick={deletePersonById}>delete</button></div>
      
    )
}
  
export default Person