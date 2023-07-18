import express from "express";
// import { errorLogger, systemLogger } from "../../utils/logger.js";
import * as cityControllers from "../controllers/cityController.js";
const router = express.Router();

/* 
=============================================
 POPLATION ROUTES {base url}/api/population
 ============================================
*/

router.get("/test", async (req, res) => {
	// const timestamp = new Date().toLocaleString();
	try {
		// systemLogger.log(`${timestamp} Population test route called`);
		res.status(200).json({ message: "Population route works" });
	} catch (error) {
		// errorLogger.log(
		// 	`${timestamp} Population Test Route Error: ${error.message}`
		// );
		res.status(500).json({ message: error.message });
	}
});

router.get("/state/:state/city/:city", cityControllers.getCity);
router.put("/state/:state/city/:city", cityControllers.addNewCity);
router.post("/state/:state/city/:city", cityControllers.updateCity);
router.delete("/state/:state/city/:city", cityControllers.deleteCity);

export default router;
