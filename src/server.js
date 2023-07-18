import express from "express";
const app = express();

import apiRoutes from "./api/routes/index.js";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const MONGODB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/?retryWrites=true&w=majority`;

// import logging function
// import { systemLogger } from "./utils/logger.js";

// import cluster and os modules to initiate multiple instances of the server for load balancing
import nodeCluster from "node:cluster";
const cluster = nodeCluster;
import nodeOs from "node:os";
// this is currently set to scale to the hardware it is running on with a max of 10 instances to prevent it from running on every core of a large scale server, for example you might not want to run 100 instances of this on a 100 core server
const numCPUs = nodeOs.cpus().length > 10 ? 10 : nodeOs.cpus().length;
import nodeProcess from "node:process";
const port = process.env.PORT || 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

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
	console.log(MONGODB_URL);
	mongoose.set("strictQuery", true);
	await mongoose.connect(
		MONGODB_URL,
		{
			ssl: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		() => console.log(" Mongoose is connected")
	);

	app.listen(port, () => {
		// const timestamp = new Date().toISOString();
		// systemLogger.log(`${timestamp} Server initiated, running on port ${port}`);
		console.log(
			`Server initiated for ${nodeProcess.pid}, running on port ${port}`
		);
	});
}
