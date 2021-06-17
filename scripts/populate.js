const mongoose = require("mongoose");
const Product = require("../models/product");
const UserLog = require("../models/userLog");
const PRODUCTS = require("./mockupData/PRODUCTS.json");
const USER_LOGS = require("./mockupData/USER_LOGS.json");
const logger = require("../middleware/logger");
const { DB_CONFIG } = require("../shared/config.js");

async function insertData() {
  try {
    await mongoose.connect(
      `mongodb://${DB_CONFIG.URI}:${DB_CONFIG.PORT}/${DB_CONFIG.NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    await Product.insertMany(PRODUCTS);
    await UserLog.insertMany(USER_LOGS);
  } catch (err) {
    logger.log("error", "Failed to insert products!");
  }
  mongoose.connection.close();
}

insertData();
