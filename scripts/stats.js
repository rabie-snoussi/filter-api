const mongoose = require("mongoose");
const fs = require("fs");
const UserLog = require("../models/userLog");
const logger = require("../middleware/logger");
const { DB_CONFIG } = require("../shared/config.js");

const PATH = "./tmp";
const FILE_NAME = "statistics.txt";

function createDir() {
  if (!fs.existsSync(PATH)) fs.mkdirSync(PATH);
}

function writeInFile(text) {
  fs.writeFileSync(`${PATH}/${FILE_NAME}`, text);
}

function formatStats({ requestStats, browserStats, osStats }) {
  let stats = "";

  requestStats.forEach((item) => {
    stats =
      stats +
      `[${item._id}]\nUnique users: ${item.uniqueUsers}\t\tTotal number of requests: ${item.requests}\n\n`;
  });

  stats = stats + "\nUsed browsers:\n";

  browserStats.forEach((item) => {
    stats = stats + `[${item._id.browser}]: ${item.count}\n`;
  });

  stats = stats + "\n\nUsed OS:\n";

  osStats.forEach((item) => {
    stats = stats + `[${item._id.os}]: ${item.count}\n`;
  });

  return stats;
}

function saveInFile(args) {
  createDir();
  const stats = formatStats(args);
  writeInFile(stats);
}

async function getStats() {
  try {
    await mongoose.connect(
      `mongodb://${DB_CONFIG.URI}:${DB_CONFIG.PORT}/${DB_CONFIG.NAME}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    const requestStats = await UserLog.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          uniqueValues: { $addToSet: "$ip" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          uniqueUsers: { $size: "$uniqueValues" },
          requests: "$count",
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const browserStats = await UserLog.aggregate([
      {
        $group: {
          _id: {
            browser: "$browser",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const osStats = await UserLog.aggregate([
      {
        $group: {
          _id: {
            os: "$os",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    saveInFile({ requestStats, browserStats, osStats });
  } catch (err) {
    logger.log("error", "Failed to get stats!");
  }
  mongoose.connection.close();
}

getStats();
