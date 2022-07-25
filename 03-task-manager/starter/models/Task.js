const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
  },
  completed: {
    type: Boolean,
    required: [true, "Must indicate completion status"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
