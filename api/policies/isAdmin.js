module.exports = async function (req, res, proceed) {
  if (req.sender.accessLevel === 'admin') {
    return proceed()
  } else {
    return res.forbidden()
  }
}
