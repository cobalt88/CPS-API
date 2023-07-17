import fs from "fs";
import { Console } from "console";

export const systemLogger = new Console({
	stdout: fs.createWriteStream("./logs/system.log", {
		flags: "a",
	}),
});

export const errorLogger = new Console({
	stdout: fs.createWriteStream("./logs/error.log", {
		flags: "a",
	}),
});