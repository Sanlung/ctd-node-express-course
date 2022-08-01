const jwt = require("jsonwebtoken");
const {BadRequestError} = require("../errors");

const login = async (req, res) => {
  const {username, password} = req.body;
  // Mongoose validation, or Joi, or check in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // work-around, usually provide by DB
  const id = new Date().getDate();
  // try to keep payload lean for better UX
  // JWT_SECRET should be long, complex, unguessable
  const token = jwt.sign({id, username}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({msg: "user created", token});
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorization token. The lucky number is: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
