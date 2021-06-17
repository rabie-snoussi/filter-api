const Product = require("../models/product");
const logger = require("../middleware/logger");

const INITIAL = {
  SKIP: 0,
  TAKE: 25,
  LIKE: "",
  MIN_PRICE: 0,
  MAX_PRICE: Infinity,
};

const handleError = (err, next) => {
  const error = new Error(err);
  error.httpStatusCode = 500;
  return next(error);
};

exports.getProducts = (req, res, next) => {
  const {
    like = "",
    skip = INITIAL.SKIP,
    take = INITIAL.TAKE,
    minPrice = INITIAL.MIN_PRICE,
    maxPrice = INITIAL.MAX_PRICE,
  } = req.query;

  const skipNumber = Number(skip);
  const takeNumber = Number(take);
  const minPriceNumber = Number(minPrice);
  const maxPriceNumber = Number(maxPrice);

  Product.find({
    name: { $regex: like, $options: "i" },
    price: { $gte: minPriceNumber, $lte: maxPriceNumber },
  })
    .skip(skipNumber)
    .limit(takeNumber)
    .then((products) => res.status(200).json(products))
    .catch((err) => {
      logger.log("error", "Failed getting products");
      handleError(err, next);
    });
};
