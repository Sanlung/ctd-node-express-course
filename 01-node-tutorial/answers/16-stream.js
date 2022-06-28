const {createReadStream} = require("fs");

const stream = createReadStream("./content/big.txt");

// default buffer size 64kb
// last buffer - remainder
// 1st param path, 2d param options object:
// highWaterMark - control size
// encoding - e.g., 'utf-8'
// const stream = createReadStream("./content/big.txt", {highWaterMark: 90000});
// const stream = createReadStream("./content/big.txt", {encoding: 'utf-8});

stream.on("data", (result) => {
  console.log(result);
});
stream.on("error", (err) => {
  console.log(err);
});
