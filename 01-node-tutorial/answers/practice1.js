const os = require("os");
const {writeFile} = require("fs");
const sentence = require("./practice2");

writeFile(
  "./content/practice.txt",
  `${sentence.slice(0, -1)}, said ${os.userInfo().username}.`,
  "utf8",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Done writing.");
  }
);
