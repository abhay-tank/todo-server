const express = require("express");
const path = require("path");
if (!process.env.NODE_ENV || !process.env.NODE_ENV == "production") {
	require("dotenv").config({ path: path.join(__dirname, "config.env") });
}
const { config } = require("./src/configuration/config");
const mongoose = require("mongoose");
const todoRoutes = require("./src/routes/todoRoutes");
const authRoutes = require("./src/routes/authRoutes");

// Launch Server after database is connected
mongoose
	.connect(config.DATABASE_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	})
	.then(() => {
		const app = express();

		app.use(express.json());
		app.use("/todos", todoRoutes);
		app.use("/auth", authRoutes);

		app.listen(config.PORT, () => {
			console.log(`Server started on http://localhost:${config.PORT}/`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
