module.exports = async function (req, res, proceed) {
  if (req.headers && req.headers.authorization) {
    const userDecoded = await sails.helpers.jwt
      .verify(req.headers.authorization, process.env.JWT_SECRET)
      .intercept('tokenExpiredError', 'forbidden')

    if (!userDecoded.iss) {
      return res.forbidden()
    }

    const user = await User.findOne({ id: userDecoded.iss.id })

    if (
      user &&
      userDecoded.accessLevel === user.accessLevel &&
      user.status === 'activated'
    ) {
      req.sender = user
      delete req.sender.password
      return proceed()
    } else {
      return res.forbidden()
    }
  } else {
    return res.forbidden()
  }
}
