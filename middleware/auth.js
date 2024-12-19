//this file is used for authentication

const jwt = require("jsonwebtoken");

// we will make a custom middle ware for authentication which will tell if he is logged in or not

function auth(req, res, next) {
  const token = req.cookies.token; // we call the token which is stored in cokkie

  if (!token) {
    return res.status(401).json({
      // 401 status represents unauthorized
      message: "Unauthorized user",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // now we verfiy the token, if token is tempered it will give error
    // else it will return this
    //   {
    //     userID: user._id,
    //     email: user.email,
    //     username: user.username,
    //   },

    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      // 401 status represents unauthorized
      message: "Unauthorized user",
    });
  }

  next(); //helped to ensure the middleware proceeds to the next step properly.
}

module.exports = auth;
