const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });
const { config } = require("./src/configuration/config");
const todoRoutes = require("./src/routes/todoRoutes");
const authRoutes = require("./src/routes/authRoutes");
const app = express();

app.use(express.json());
app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.listen(config.PORT, () => {
	console.log(`Server started on http://localhost:${config.PORT}/`);
});
