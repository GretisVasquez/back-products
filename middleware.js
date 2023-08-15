const middleware = (req, res, next) => {
  console.warn("Middleware");
  next();
};

module.exports = { middleware };
