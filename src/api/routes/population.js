import express from 'express';
import { errorLogger, systemLogger } from '../../utils/logger.js';
const router = express.Router();

/* 
=============================================
 POPLATION ROUTES {base url}/api/population
 ============================================
*/

router.get('/test', async (req, res) => {
  const timestamp = new Date().toLocaleString();
  try {
    systemLogger.log(`${timestamp} Population test route called`);
    res.status(200).json({ message: 'Population route works' });
  } catch (error) {
    errorLogger.log(`${timestamp} Population Test Route Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
})

export default router;