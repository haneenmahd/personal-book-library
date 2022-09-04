const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./app/models");
const configureRoutes = require("./app/routes");
const { writeDebugLogs } = require("./utils/writeDebugLogs");

const app = express();

const PORT = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!");
    console.log("Exiting the process, please restart to try again!");

    writeDebugLogs(err); // writing debug logs to help debugging

    process.exit(1);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
