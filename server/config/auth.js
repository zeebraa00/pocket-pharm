const auth = (level) => {
  return (req, res, next) => {
    if (!req.session.user) {
      res.status(401);
      res.send({
        result: false,
        error: 'No auth',
      });
    }
    else {
      next();
    }
  };
};

module.exports = auth;
