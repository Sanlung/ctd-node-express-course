const consoleLog = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date();
  console.log(method, url, time);
  next();
};

module.exports = consoleLog;
