const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "invalid data",
      });
    }

    const { email, username, password } = req.body;

    // console.log("Original Password:", password);
    // console.log("Password Length:", password.length);

    const hashPassword = await bcrypt.hash(password, 10);

    // console.log("Generated Hash:", hashPassword);
    // console.log("Hash Length:", hashPassword.length);

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "invalid data",
      });
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({
      username,
    });

    // console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: " username or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token); //2 parmeter name of token ,value or var of token . we put this details in cookie to call it later for authentication

    res.redirect("/home");
  }
);

module.exports = router;
