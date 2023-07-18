import { Cities } from "../models/City.js";
import { errorLogger, systemLogger } from "../../utils/logger.js";
import mongoose from "mongoose";
import { timestampLocal, timestampUTC } from "../../utils/timestamp.js";

/**
 * @function nameFormatter
 * @param {String} x
 * @returns String
 * @description Capitalizes the first letter of every word in a string. Used to ensure data entry uniformity.
 */

const nameFormatter = (x) => {
	const cap = x.split(" ").map((word) => {
		return word[0].toUpperCase() + word.slice(1);
	});
	return cap.join(" ");
};

/**
 * @function checkForCity
 * @example checkForCity("portland", "oregon")
 * @param {String} city
 * @param {String} state
 * @returns {Object} cityData
 * @description Checks the database for the city and state submitted by the user. Inputs are case insensitive.
 */

const checkForCity = async (city, state) => {
	try {
		const checkForCity = await Cities.findOne({
			City: new RegExp(city, "i"),
			State: new RegExp(state, "i"),
		});
		return checkForCity;
	} catch (err) {
		errorLogger.log(
			`${timestampUTC()} Error encountered in checkForCity: ${err}`
		);
		console.log(err);
	}
};

/**
 * @function getCity
 * @example GET /api/population/state/oregon/city/portland
 * @returns {Object} city population data.
 * @description Gets the population of a city in a state. Inputs are case insensitive. If the city does not exist in the database, a 400 error is returned, If db does exist population data is returned.
 */

export const getCity = async (req, res) => {
	systemLogger.log(`${timestampUTC()} getCity called`);
	try {
		const cityName = nameFormatter(req.params.city);
		const stateName = nameFormatter(req.params.state);

		const cityData = await checkForCity(cityName, stateName);
		cityData
			? res.status(200).json(cityData.Population)
			: res.status(400).json({
					message: `No data for city: ${cityName}, in State: ${stateName}. Please check your search parameters and try again.`,
			  });
	} catch (err) {
		errorLogger.log(`${timestampUTC()} Error encountered in getCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};

/**
 * @function updateCity
 * @example PUT /api/population/state/oregon/city/portland
 * @returns {Object} message
 * @description Updates the population of a city in a state. Inputs are case insensitive. If the city does not exist in the database, a 400 error is returned, If city state does exist population data is updated.
 */

export const updateCity = async (req, res) => {
	systemLogger.log(`${timestampUTC()} updateCity called`);
	try {
		const city = nameFormatter(req.params.city);
		const state = nameFormatter(req.params.state);
		const population = parseInt(req.body.population);

		const cityData = await checkForCity(city, state);

		cityData
			? await Cities.findOneAndUpdate({
					City: city,
					State: state,
					Population: population,
			  })
			: res.status(400).json({
					message: `City: ${city} in State: ${state} does not exist in the database. Please check your search parameters and try again.`,
			  });
		res.status(200).json({
			message: `City: ${city} in State: ${state} has been updated in the database.`,
		});
	} catch (err) {
		errorLogger.log(
			`${timestampUTC()} Error encountered in updateCity: ${err}`
		);
		res.status(500).json({ message: err.message });
	}
};

/**
 * @function addNewCity
 * @example POST /api/population/state/oregon/city/portland
 * @package json body {"population": 1000000}
 * @returns {Object} message
 * @description Adds a new city to the database. Inputs are case insensitive. If the city already exists in the database, a 400 error is returned, If city does not exist population data is added to the database.
 */

export const addNewCity = async (req, res) => {
	systemLogger.log(`${timestampUTC()} addNewCity called`);
	try {
		const city = nameFormatter(req.params.city);
		const state = nameFormatter(req.params.state);
		const population = parseInt(req.body.population);

		const cityData = await checkForCity(city, state);

		cityData
			? res.status(400).json({
					message: `City: ${city} in State: ${state} already exists in the database. and cannot be created again. Try a POST route if you intend to update the city information.`,
			  })
			: null;

		const newCity = new Cities(
			{
				_id: new mongoose.Types.ObjectId(),
				City: city,
				State: state,
				Population: population,
			},
			{
				new: true,
			}
		);

		await Cities.create(newCity);
		res.status(200).json({
			message: `New city added: ${newCity.City} ${newCity.State}, Population: ${newCity.Population}`,
		});
	} catch (err) {
		errorLogger.log(`${timestampUTC} Error encountered in addNewCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};

/**
 * @function deleteCity
 * @example DELETE /api/population/state/oregon/city/portland
 * @description Finds a city/state in the database and deletes it if it exists. If no data is found to delete a 400 error is returned.
 */

export const deleteCity = async (req, res) => {
	systemLogger.log(`${timestampUTC} deleteCity called`);

	try {
		const city = await nameFormatter(req.params.city);
		const state = await nameFormatter(req.params.state);
		const deletedCity = await Cities.findOneAndDelete(
			{
				City: new RegExp(city, "i"),
				State: new RegExp(state, "i"),
			},
			{
				new: true,
			}
		);

		deletedCity
			? res.status(200).json({
					message: `${req.params.city} ${req.params.state} has been removed from the database`,
			  })
			: res.status(400).json({
					message: `City: ${city} in State: ${state} does not exist in the database and cannot be deleted.`,
			  });
	} catch (err) {
		errorLogger.log(`${timestampUTC} Error encountered in deleteCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};
