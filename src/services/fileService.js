const fs = require("fs");
const util = require("util");
const path = require("path");
const writeFileAsync = util.promisify(fs.writeFileSync);

class FileService {
	// source will be fetched from env in future
	constructor() {
		const source = path.join(__dirname, "..", "data", "db.json");
		try {
			this.data = JSON.parse(fs.readFileSync(source, { encoding: "utf-8" }));
		} catch (error) {
			console.error("Error getting data from source", error);
			return error;
		}
	}
	// Return Promise
	updateFile() {
		try {
			return writeFileAsync(source, JSON.stringify(this.data));
		} catch (error) {
			console.error("Error saving file", error);
			return error;
		}
	}
}

module.exports = FileService;
