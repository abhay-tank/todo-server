const FileService = require("./fileService");
const mongoose = require("mongoose");
const { config } = require("../configuration/config");
class DatabaseService {
  constructor() {
    switch (config.DATA_SOURCE) {
      case "file":
        this.db = new FileService();
        break;
      case "mongodb":
        mongoose.connect(config.DATABASE_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        });
    }
  }
}

module.exports = new DatabaseService();
