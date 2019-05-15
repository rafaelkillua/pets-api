module.exports = async function (req, res, proceed) {
  if (req.headers && req.headers.authorization) {
    let userDecoded

    try {
      userDecoded = await sails.helpers.jwt
        .verify(req.headers.authorization, process.env.JWT_SECRET)
    } catch (unused) {
      console.log('1')
      return res.forbidden()
    }

    if (!userDecoded.iss) {
      console.log('2')
      return res.forbidden()
    }

    const user = await User.findOne({ id: userDecoded.iss.id })

    if (
      user &&
      user.status === 'activated'
    ) {
      req.sender = user
      delete req.sender.password
      return proceed()
    } else {
      console.log('3')
      return res.forbidden()
    }
  } else {
    console.log('4')
    return res.forbidden()
  }
}
