const express = require("express");
const productRoutes = require("./routes/product");
const dbConnect = require("./middleware/dbConnect.js");
const { SERVER_PORT } = require("./shared/config.js");

const app = express();

app.use(dbConnect);

app.use("/", productRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Error: Path doesn't exist!" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Error: Something wrong happenned!" });
});

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}.`);
});
