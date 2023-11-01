module.exports = {
  user: async (req, res, next) => {
    if (req.session.verified) {
      req.user = {
        email: req.session.email,
        name: req.session.name,
        studentId: req.session.hd,
      }
    }

    next();
  },

  isGuest: (req, res, next) => {
    if (!req.user) {
      return next();
    }

    if (req.xhr) {
      res.status(403).json({message: 'Forbidden'});
    } else {
      res.redirect('/');
    }
  },

  isAuthenticated: (req, res, next) => {
    if (req.user) {
      return next();
    }

    res.status(401).json({message: 'Authorization Required'});
  },
}
