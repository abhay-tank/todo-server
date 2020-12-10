const path = require("path");
const FileService = require("./fileService");

class DatabaseService {
  // source will be fetched from env in future
  constructor(sourceType, source) {
    switch (sourceType) {
      case "file":
        this.db = new FileService(source);
        break;
    }
  }
}

module.exports = new DatabaseService(
  "file",
  path.join(__dirname, "..", "data", "db.json")
);
