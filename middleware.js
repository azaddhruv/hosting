module.exports.isAuth = async (req, res, next) => {
  if (req.session.user_id) {
    next()
  } else {
    res.send('Not Authenticated')
  }
}
