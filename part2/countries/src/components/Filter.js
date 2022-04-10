const Filter = ({ filter, onChange}) => {
    return(
        <div>
            find countries <input value={filter} onChange={onChange}></input>
        </div>
    )
}

export default Filter