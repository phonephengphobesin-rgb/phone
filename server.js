const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "Welcome to NodeJS + Express + MySQL application." });
});

require("./app/routes/product.route.js")(app);
require("./app/routes/category.route.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");

});