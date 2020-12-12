const FileService = require("./fileService");
const mongoose = require("mongoose");
const { config } = require("../configuration/config");
class DatabaseService {
  // source will be fetched from env in future
  constructor() {
    switch (config.DATA_SOURCE) {
      case "file":
        this.db = new FileService();
        break;
      case "mongodb":
        this.connectDB();
    }
  }

  async connectDB() {
    this.db = await mongoose.connect(config.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
}

module.exports = new DatabaseService("file");
