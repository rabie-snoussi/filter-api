const mongoose = require("mongoose");
const logger = require("./logger");
const { DB_CONFIG } = require("../shared/config.js");

const handleError = (err, next) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

module.exports = async (req, res, next) => {
  try {
    await mongoose.connect(
      `mongodb://${DB_CONFIG.URI}:${DB_CONFIG.PORT}/${DB_CONFIG.NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    next();
  } catch (err) {
    logger.log("error", "Failed to connect to the database!");
    handleError(err, next);
  }
};
