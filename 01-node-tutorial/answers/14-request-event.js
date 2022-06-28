const http = require("http");

// use event emitted API
const server = http.createServer();
// emits request event
// subscribe to it / listen for it / respond to it
server.on("request", (req, res) => {
  res.end("Welcome");
});

server.listen(3000);
