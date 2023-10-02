import express from "express";
import apiRoutes from "./api/routes/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { systemLogger } from "./utils/logger.js";
import { timestampUTC } from "./utils/timestamp.js";
import nodeCluster from "node:cluster";
import nodeOs from "node:os";
import nodeProcess from "node:process";
import "dotenv/config";

const MONGODB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.CLUSTER}/?retryWrites=true&w=majority`;
const cluster = nodeCluster;
const numCPUs = nodeOs.cpus().length > 10 ? 10 : nodeOs.cpus().length;
const port = process.env.PORT || 5555;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

if (cluster.isPrimary && numCPUs > 2) {
	console.log(`Primary node ${nodeProcess.pid} is running`);
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
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
		systemLogger.log(`${timestampUTC()} Server initiated, running on port ${port}`);
		console.log(`Server initiated for ${nodeProcess.pid}, running on port ${port}`);
	});
}
