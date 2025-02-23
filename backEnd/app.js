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
const corsOptions = {
  origin: [
    "https://thriveuploads.netlify.app",
    "https://thriveapp.onrender.com",
  ],
  credentials: true, // Allows cookies to be sent
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.set("view engine", "ejs");
app.use(cookiesParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
