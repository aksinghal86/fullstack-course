import { useState } from 'react'
import ShowCountryDetail from './ShowCountryDetail'

const ShowCountries = ({ countriesToShow }) => {
    const [showCountry, setShowCountry] = useState(null)
    const handleShowCountry = (country) => {
      setShowCountry(country)
    }
    
    if (countriesToShow.length < 10) { 
      return (
        <div>
          {countriesToShow.map(country => 
            <div key={country.ccn3}>
              {country.name.common}
              <button onClick={() => {handleShowCountry(country)}}>show</button>
            </div>
          )}
          <ShowCountryDetail country={showCountry} />
        </div>
      )
    } else {
      return (
        <p>Too many matches. Please be more specific.</p>
      )
    }
  }
  
  export default ShowCountries