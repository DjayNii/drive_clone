const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes");
const dotenv = require("dotenv");
dotenv.config();

const connectToDb = require("./config/db");
connectToDb();
const cookiesParser = require("cookie-parser");

const app = express();
app.use(cors());

app.set("view engine", "ejs");
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server listing on port 3000");
});
