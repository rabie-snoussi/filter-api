const express = require("express");

const router = express.Router();
const productController = require("../controllers/product");
const userLogController = require("../controllers/userLog");

router.get("/products", (req, res, next) => {
  userLogController.addUserLog(req, res, next);
  productController.getProducts(req, res, next);
});

module.exports = router;
