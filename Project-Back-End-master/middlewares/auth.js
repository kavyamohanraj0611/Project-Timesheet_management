const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.isAuthenticatedUser = async (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).json("Access denied , Please login")
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).json("Access denied , Please login")
  }
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET)
  }
  catch (err) {
    return res.status(401).json("Access denied , Please login")
  }
  next()
}

