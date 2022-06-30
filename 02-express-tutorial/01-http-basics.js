const http = require("http");
const {readFileSync} = require("fs");

// get all files
const homePage = readFileSync("./navbar-app/index.html");
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  // home page
  if (url === "/") {
    res.writeHead(200, {"content-type": "text/html"});
    res.write(homePage);
    res.end();
  } // about page
  else if (url === "/about") {
    res.writeHead(200, {"content-type": "text/html"});
    res.write("<h1>About Page</h1>");
    res.end();
  } // 404
  else {
    res.writeHead(404, {"content-type": "text/html"});
    res.write("<h1>Page Not Found</h1>");
    res.end();
  }
});

server.listen(3000);
