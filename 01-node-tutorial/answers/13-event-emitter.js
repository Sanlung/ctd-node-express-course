const EventEmitter = require("events");

const customEmitter = new EventEmitter();

// emit() - emit an event
// on() - listen for an event
// must listen first then emit the event

customEmitter.on("response", (name, id) => {
  console.log(`data received user ${name} with id: ${id}`);
});

customEmitter.on("response", () => {
  console.log("some other logic here.");
});

customEmitter.emit("response", "Chung", 34);
