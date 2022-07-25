const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.get("/hello", (req, res) => res.send("Task Manager App"));

// app.get("/api/v1/tasks");
// app.post("/api/v1/tasks");
// app.get("/api/v1/tasks/:id");
// app.patch("/api/v1/tasks/:id");
// app.delete("/api/v1/tasks/:id");
app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server started at port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
