import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Country from './components/Country'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([]) 
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            setCountries(response.data)
          })
      }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const countriesToShow = filter === ''
        ? countries
        : countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

    if(countriesToShow.length > 10){
        return(
            <div>
                <Filter filter={filter} onChange={handleFilterChange}/>
                <p>Too many matches, specify another filter</p>
            </div>  
        )
    } else if (countriesToShow.length === 1){
        return (
            <div>
                <Filter filter={filter} onChange={handleFilterChange}/>
                <Country country={countriesToShow[0]}/>
            </div>
        )
    } else {
        return (
            <div>
                <Filter filter={filter} onChange={handleFilterChange}/>
                <div>
                    {countriesToShow.map(country =>
                        <div key={country.name.official}>
                            {country.name.common} 
                            <button onClick={() => setFilter(country.name.common)}  type="submit">show</button>
                        </div>
                    )}
                </div> 
            </div>
        )
    }
}

export default App