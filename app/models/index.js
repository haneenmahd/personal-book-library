const dbConfig = require("../db.config");
const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.books = require("./books.model.js")(mongoose);

module.exports = db;
