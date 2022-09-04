const fs = require("fs");
const path = require("path");

const LOG_DIRECTORY = path.resolve(__dirname, "..", "logs");
const LOG_PATH = () =>
  path.resolve(LOG_DIRECTORY, `${new Date().toUTCString()}.log`);

function makeLogDirectory() {
  if (fs.existsSync(LOG_DIRECTORY)) {
    return;
  }

  fs.mkdirSync(LOG_DIRECTORY, {
    recursive: false,
  });
}

function writeDebugLogs(log) {
  makeLogDirectory();

  // making sure data is type of string to avoid data type errors.
  fs.writeFileSync(LOG_PATH(), String(log), "utf-8");
}

module.exports = {
  writeDebugLogs,
};
