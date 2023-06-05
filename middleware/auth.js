const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token)
    return res
      .status(401)
      .send('Unauthorized! Access Denied : No token provided!')
  try {
    const decoded = jwt.verify(token, 'login')
    req.user = decoded
    next()
  } catch (ex) {
    res
      .status(401)
      .send('Unauthorized! Access Denied : Token Might be invalid or expired!')
  }
}