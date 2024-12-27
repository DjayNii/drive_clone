const mongoosee = require("mongoose");

function connectToDb() {
  mongoosee.connect(process.env.MONGO_URI).then(() => {
    console.log("connect To Db");
  });
}

module.exports = connectToDb;
