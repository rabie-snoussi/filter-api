const useragent = require("express-useragent");
const UserLog = require("../models/userLog");
const logger = require("../middleware/logger");

const handleError = (err, next) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

exports.addUserLog = async (req, res, next) => {
  const source = req.headers["user-agent"];
  const { os, browser } = useragent.parse(source);
  const currentDate = new Date();
  const userLog = new UserLog({ ip: req.ip, os, browser, date: currentDate });

  await userLog.save().catch((err) => {
    logger.log("error", "Failed to insert a userlog");
    handleError(err, next);
  });
};
