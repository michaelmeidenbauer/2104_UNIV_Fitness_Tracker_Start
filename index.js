// create the express server here
var app = require("express");
var cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./api");
const { client } = require("./db");

const PORT = 3000;

var app = express();

app.use(cors());
app.use(morgan("dev"));

app.use("/api", apiRouter);

// TODO: Delete this if it's not doing anything
app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(PORT, function () {
  try {
    client.connect();
    console.log("connected to db");
  } catch (error) {
    console.error(error);
  }
  console.log("The server is up on port", PORT);
});
