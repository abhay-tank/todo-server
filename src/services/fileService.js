const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFileSync);

class FileService {
  // source will be fetched from env in future
  constructor(source) {
    try {
      this.data = JSON.parse(fs.readFileSync(source, { encoding: "utf-8" }));
    } catch (error) {
      console.error("Error getting data from source", error);
      return error;
    }
  }
  // Return Promise
  updateFile(newData) {
    this.data = newData;
    try {
      return writeFileAsync(source, JSON.stringify(newData));
    } catch (error) {
      console.error("Error saving file", error);
      return error;
    }
  }
}

module.exports = FileService;
