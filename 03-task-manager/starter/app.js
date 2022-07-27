const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// aroutes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server started at port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

startApp();
