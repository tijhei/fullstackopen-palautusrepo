import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}

const getInformationByName = (name) => {
  const request = axios.get(`${baseUrl}/api/name/${name}`)
  return request.then(response => response.data)
}

const getWeatherDataByName = (name) => {
  
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)

}

export default { getAll, getInformationByName, getWeatherDataByName }