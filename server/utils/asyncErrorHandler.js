function asyncErrorHandler (error, res) {
  console.error(error.message);
  res.sendStatus(500);
}

module.exports = asyncErrorHandler;
