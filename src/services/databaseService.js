const FileService = require("./fileService");

class DatabaseService {
	// source will be fetched from env in future
	constructor(sourceType) {
		switch (sourceType) {
			case "file":
				this.db = new FileService();
				this.data = this.db.data;
				this.updateToDB = this.db.updateFile;
				break;
		}
	}
}

module.exports = new DatabaseService("file");
