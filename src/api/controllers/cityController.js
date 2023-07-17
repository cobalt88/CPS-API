import { Cities } from '../models/City.js';
import { errorLogger, systemLogger } from '../../utils/logger.js';

// option 1 for making strings non-case senstive is to caliptalize the fist letter of every string to esure uniform data entry
const nameFormatter = (x) => {
  const cap = x.charAt(0).toUpperCase() + x.slice(1)
  return cap
}

export const getCity = async (req, res) => {
  console.log("made it to get city")
  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} getCity called`)
  try {
    const cityName = req.params.city
    const stateName = req.params.state

  // option 2 for making strings non-case senstive is to use a regular expression to search for the string with the "i" flag
    const cityData = await Cities.findOne({
      City: new RegExp(cityName, "i"),
      State: new RegExp(stateName, "i")
    })
    // if no data is found inform the user that the city and state they are searching for is not in the database and return the values they submitted.
    cityData ? res.status(200).json(cityData.Population) : res.status(400).json({ message: `No data for city: ${cityName}, in State: ${stateName}. Please check your search parameters and try again.` })

  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in getCity: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const addNewCity = async (req, res) => {

  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} addNewCity called`)
  try {
    console.log(req.body)
    const city = await nameFormatter(req.params.city)
    const state = await nameFormatter(req.params.state)
    const population = parseInt(req.body.Population)
    
    const newCity = await Cities.create({
      City: city,
      State: state,
      Population: population
    },
    {
      new: true,
    })

    console.log(newCity)

    res.status(200).json({ message: `New city added: ${newCity.City} ${newCity.State}, Population: ${newCity.Population}` })
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in addNewCity: ${err}`)
    res.status(500).json({ message: err.message })
  }
}

export const deleteCity = async (req, res) => {
  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} deleteCity called`)
  try {
    res.status(200).json({ message: `made it to the delete city route ${req.params.city} ${req.params.state}` })
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in deleteCity: ${err}`)
    res.status(500).json({ message: err.message })
  }
}