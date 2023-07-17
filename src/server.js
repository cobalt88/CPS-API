import express from 'express';
const app = express();

import api from './api/index.js';

import dotenv from 'dotenv';
dotenv.config()

// import cluster and os modules to initiate multiple instances of the server for load balancing
import nodeCluster from "node:cluster"
const cluster = nodeCluster;
import nodeOs from "node:os"
// this is currently set to scale to the hardware it is running on with a max of 10 instances to prevent it from running on every core of a large scale server, for example you might not want to run 100 instances of this on a 100 core server
const numCPUs = nodeOs.cpus().length > 10 ? 10 : nodeOs.cpus().length;
import nodeProcess from "node:process"
const port = process.env.PORT || 3000;

app.use('/api', api);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

if (cluster.isPrimary) {
	console.log(`Primary node ${nodeProcess.pid} is running`);

	// Startup workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
  // log the death of a worker and restart it 
	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {

	app.listen(port, () => {
		const now = new Date();
		const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
		console.log(timestamp);
		// systemLogger.log(`${timestamp} Server initiated, running on port ${port}`);
		console.log(
			`Server initiated for ${nodeProcess.pid}, running on port ${port}`
		);
	});
}