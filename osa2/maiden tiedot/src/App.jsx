import { useState, useEffect } from 'react'
import countryAPI from './services/countries'

const Filter = (props) => (
  <form>
        find countries: <input
                value={props.newFilter}
                onChange={props.handleFilterChange}
                />
      </form>
)
const Message = ({ message }) => (
  <p>{message}</p>
)
const Countries = ({ countries, showDetails }) => (
  countries.map((country, index) =>
    <div id={index} key={index}><p className="inline-block">{country.name.common}</p><button onClick={showDetails}>show</button></div>
  )
)

const CountryDetail = ({ country, capitalWeather }) => {
  if(country) {
    const weatherIcon = 'https://openweathermap.org/img/wn/'+capitalWeather.weather[0].icon+'@2x.png'
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <div>
          <p>Languages:</p>
          <ul>
            {Object.keys(country.languages).map((languageCode, index) => (
              <li key={index}>
                {country.languages[languageCode]}
              </li>
            ))}
          </ul>
        </div>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        <h1>Weather in {country.capital[0]}</h1>
        <p>Temperature: {capitalWeather.main.temp} Celsius</p>
        <img src={weatherIcon}></img>
        <p>Wind: {capitalWeather.wind.speed} m/s</p>
      </div>
    )
  }
  
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [countriesToShow, setCountriesToShow] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [countryDetails, setCountryDetails] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState([])
  const [message, setMessasge] = useState('')


  const firstRenderHook = () => {
    console.log('effect')
    countryAPI
      .getAll()
      .then(response => {
        setCountries(countries.concat(response))
        setMessasge("Too many matches, please specify another filter.")
      })
  }
  
  useEffect(firstRenderHook, [])

  const filterHook = () => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(newFilter.toLowerCase())
    )
    if(filteredCountries.length == 1) {
      countryAPI
        .getWeatherDataByName(filteredCountries[0].capital[0])
        .then(response => {
          setCountryDetails(filteredCountries[0])
          setCapitalWeather(response)
          setCountriesToShow([])
          setMessasge('')
        })
    } else if(filteredCountries.length <= 10) {
      setCountriesToShow(filteredCountries)
      setCountryDetails(null)
      setMessasge('')
    } else {
      setMessasge("Too many matches, please specify another filter.")
      setCountriesToShow([])
      setCountryDetails(null)
    }
  }

  useEffect(filterHook, [newFilter])

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const showDetails = (e) => {
    console.log(e.target.parentNode, e.target.parentNode.id)
    
    countryAPI
        .getWeatherDataByName(countriesToShow[e.target.parentNode.id].capital[0])
        .then(response => {
          setCapitalWeather(response)
          setCountryDetails(countriesToShow[e.target.parentNode.id])
          setCountriesToShow([])
        })
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <Message message={message} />
      <Countries countries={countriesToShow} showDetails={showDetails}/>
      <CountryDetail country={countryDetails} capitalWeather={capitalWeather} />
    </div>
  )

}

export default App