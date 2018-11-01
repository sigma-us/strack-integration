const router = require('express').Router(); // eslint-disable-line
// const claimsRoutes = require('./claims.routes');

// router.use('/api', claimsRoutes);

// Handle API 404
router.use('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

router.use((err, req, res, next) => {
  // If the error object doesn't exists
  if (!err) {
    return next();
  }

  // Log it
  console.error(err.stack);

  // Redirect to error page
  res.status(res.statusCode || 500);
});

module.exports = router;
