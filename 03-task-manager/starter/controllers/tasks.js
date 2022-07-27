const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({tasks});
  // res.status(200).json({tasks, amount: tasks.length});
  // res.status(200).json({
  //   success: true,
  //   data: {
  //     tasks,
  //     amount: tasks.length,
  //   },
  // });
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tasks,
  //     nbHits: tasks.length,
  //   },
  // });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const {id: taskId} = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {
  const {id: taskId} = req.params;
  const task = await Task.findByIdAndUpdate(taskId, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({task});
});

// const editTask = async (req, res) => {
//   try {
//     const {id: taskId} = req.params;
//     const task = await Task.findByIdAndUpdate(taskId, req.body, {
//       returnDocument: "after",
//       runValidators: true,
//       overwrite: true,
//     });
//     if (!task) {
//       return res.status(404).json({msg: `No task with id: ${taskId}`});
//     }
//     res.status(200).json({task});
//   } catch (error) {
//     res.status(500).json({msg: error});
//   }
// };

const deleteTask = asyncWrapper(async (req, res) => {
  const {id: taskId} = req.params;
  const task = await Task.findOneAndDelete({_id: taskId});
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({task});
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  // editTask,
  deleteTask,
};
