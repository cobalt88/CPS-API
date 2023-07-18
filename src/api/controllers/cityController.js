import { Cities } from "../models/City.js";
// import { errorLogger, systemLogger } from "../../utils/logger.js";
import mongoose from "mongoose";

// option 1 for making strings non-case senstive is to caliptalize the fist letter of every string to ensure uniform data entry.
const nameFormatter = (x) => {
	const cap = x.split(" ").map((word) => {
		return word[0].toUpperCase() + word.slice(1);
	});
	return cap.join(" ");
};

// option 2 for making strings non-case senstive is to use a regular expression to search for the string with the "i" flag
const checkForCity = async (city, state) => {
	try {
		const checkForCity = await Cities.findOne({
			City: new RegExp(city, "i"),
			State: new RegExp(state, "i"),
		});
		return checkForCity;
	} catch (err) {
		// errorLogger.log(`${timestamp} Error encountered in checkForCity: ${err}`);
		console.log(err);
	}
};

export const getCity = async (req, res) => {
	// const timestamp = new Date().toISOString();
	// systemLogger.log(`${timestamp} getCity called`);
	try {
		const cityName = await nameFormatter(req.params.city);
		const stateName = await nameFormatter(req.params.state);

		const cityData = await checkForCity(cityName, stateName);
		// if no data is found inform the user that the city and state they are searching for is not in the database and return the values they submitted.
		cityData
			? res.status(200).json(cityData.Population)
			: res.status(400).json({
					message: `No data for city: ${cityName}, in State: ${stateName}. Please check your search parameters and try again.`,
			  });
	} catch (err) {
		// errorLogger.log(`${timestamp} Error encountered in getCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};

export const updateCity = async (req, res) => {
	// const timestamp = new Date().toISOString();
	// systemLogger.log(`${timestamp} updateCity called`);
	try {
		const city = await nameFormatter(req.params.city);
		const state = await nameFormatter(req.params.state);
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
		// errorLogger.log(`${timestamp} Error encountered in updateCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};

export const addNewCity = async (req, res) => {
	// const timestamp = new Date().toISOString();
	// systemLogger.log(`${timestamp} addNewCity called`);
	try {
		const city = await nameFormatter(req.params.city);
		const state = await nameFormatter(req.params.state);
		const population = parseInt(req.body.population);

		const cityData = await checkForCity(city, state);

		cityData
			? res.status(400).json({
					message: `City: ${city} in State: ${state} already exists in the database. and cannot be created again. Try a POST route if you intend to update the city information.`,
			  })
			: null;

		const newCity = await new Cities(
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
		// errorLogger.log(`${timestamp} Error encountered in addNewCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};

export const deleteCity = async (req, res) => {
	// const timestamp = new Date().toISOString();
	// systemLogger.log(`${timestamp} deleteCity called`);
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
		// errorLogger.log(`${timestamp} Error encountered in deleteCity: ${err}`);
		res.status(500).json({ message: err.message });
	}
};
