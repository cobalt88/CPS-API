import fs from "fs";
import { Console } from "console";

export const systemLogger = new Console({
	stdout: fs.createWriteStream("./src/logs/system.log", {
		flags: "a",
	}),
});

export const errorLogger = new Console({
	stdout: fs.createWriteStream("./src/logs/error.log", {
		flags: "a",
	}),
});