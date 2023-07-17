import {City} from '../models/City.js';
import { errorLogger, systemLogger } from '../../utils/logger.js';



export const getCity = async (req, res) => {
  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} getCity called`)
  try {
    const data = await City.findOne({City: req.params.city, State: req.params.state})
    res.status(200).json({ message: 'made it to get city route' })
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in getCity: ${err}`)
    res.status(500).json({ message: err.message })
  } finally {
    systemLogger.log(`${timestamp} getCity finished`)
  }
}

export const updateCity = async (req, res) => {
  const timestamp = new Date().toISOString()
  try {
    // const newCity = await City.findOneAndUpdate({
    //   City: req.body.City,
    // },
    // {  
    //   State: req.body.State,
    //   Population: req.body.Population,
    // },
    // {
    //   upsert: true,
    // })
    res.status(200).json({ message: `made it to the update city route` })
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in addNewCity: ${err}`)
    res.status(500).json({ message: err.message })
  } finally {
    systemLogger.log(`${timestamp} addNewCity finished`)
  }
}

export const addNewCity = async (req, res) => {
  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} addNewCity called`)
  try {
    res.status(200).json({message: `made it to the add new city route`})
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in addNewCity: ${err}`)
    res.status(500).json({ message: err.message })
  } finally {
    systemLogger.log(`${timestamp} addNewCity finished`)
  }
}

export const deleteCity = async (req, res) => {
  const timestamp = new Date().toISOString()
  systemLogger.log(`${timestamp} deleteCity called`)
  try {
    res.status(200).json({message: `made it to the dete city route`})
  } catch (err) {
    errorLogger.log(`${timestamp} Error encountered in deleteCity: ${err}`)
    res.status(500).json({ message: err.message })
  } finally {
    systemLogger.log(`${timestamp} deleteCity finished`)
  }
}