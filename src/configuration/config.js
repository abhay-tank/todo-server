const config = {
	PORT: process.env.PORT,
	DATABASE_URL: process.env.DATABASE_URL,
	DATA_SOURCE: process.env.DATA_SOURCE,
	JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = { config };
