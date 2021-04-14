const bodyParser = require("body-parser");
const express = require("express");
const sharesRouter = require("./api/shares");
const bikesRouter = require("./api/bikes");
require("./database/mongoose");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

app.use("/shares", sharesRouter);
app.use("/bikes", bikesRouter);

app.get("/", async (req, res) => {
  console.log(
    "Root api call - In a more complex project this api would do something (i.e help load landing page or redirect to login flow and handle authentication)"
  );
  res.status(200).send();
});

app.listen(port, function () {
  console.log("Node Server started at port:", port);
});
