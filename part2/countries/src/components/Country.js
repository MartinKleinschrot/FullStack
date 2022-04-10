import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const [capitalweather, setCapitalWeather] = useState({}) 
    
    const api_key = process.env.REACT_APP_API_KEY
    const urlWeather = 'http://api.openweathermap.org/data/2.5/weather?q=' + country.capital + ',' + country.cca2 + '&APPID=' + api_key + '&units=metric'

    useEffect(() => {
        axios
            .get(urlWeather)
            .then(response => {
                setCapitalWeather(response.data)
            })
    },[])
    
    var languages = [];
    for (var language in country.languages) {
        const languageentry = {
            name: language,
            value: country.languages[language]
        }
        languages.push(languageentry);
    }
    console.log(urlWeather)
 console.log(Object.keys(capitalweather).length === 0)
    if (Object.keys(capitalweather).length === 0){
        return (
            <div>
                <h1>{country.name.common} </h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
    
                <b>languages:</b>
                <ul>
                    {languages.map(language =>
                        <li key={language.name}>{language.value} </li>
                    )}
                </ul>
                <img src={country.flags.png} alt=''/>
            </div>
        )
    } else {
        const urlWeatherIcon = 'http://openweathermap.org/img/wn/' + capitalweather.weather[0].icon + '@2x.png'
        return (
            <div>
                <h1>{country.name.common} </h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
    
                <b>languages:</b>
                <ul>
                    {languages.map(language =>
                        <li key={language.name}>{language.value} </li>
                    )}
                </ul>
                <img src={country.flags.png} alt=''/>
                <h2>Weather in {country.capital}</h2>
                <p>temperature {capitalweather.main.temp} Celcius</p>
                <img src={urlWeatherIcon} alt=''/>
                <p>wind {capitalweather.wind.speed} m/s</p>
            </div>
        )
    }
}
  
export default Country