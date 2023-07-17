import express from 'express';
const router = express.Router();

import population from './population.js';

router.use('/population', population);

export default router;