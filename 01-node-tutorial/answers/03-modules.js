// CommonJS, every file is a module (by default)
// Modules - encapsulated code (only share minimum)
const {john, peter} = require("./04-names");
const sayHi = require("./05-utils");
const data = require("./06-alternative-flavor");
import addValues from "./07-mind-grenade";

sayHi("susan");
sayHi(john);
sayHi(peter);
