import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    let newtask = await Task.create({
      ...req.body,
      user: userId,
    });
    if (!newtask) throw new Error("Task not created");
    let addId = await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newtask._id } },
      { new: true }
    );
    if (!addId) throw new Error("error in adding task id in user");

    res.status(200).send({
      msg: "task created successfully",
      status: true,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getAllTask = asyncHandler(async (req, res) => {
  try {
    let userId = req.user._id;
    const allTask = await Task.find({
      user: userId,
    }).sort({ priority: 1 });
    res.status(200).json(allTask);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const updateStatus = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    let newStatus = req.body.status;
    let updatedStatus = await Task.findByIdAndUpdate(
      taskId,
      {
        status: newStatus,
      },
      { new: true }
    );
    if (!updatedStatus) throw new Error("error while updating");
    res.status(200).send({
      msg: "task status updated",
      status: true,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const taskId = req.params.id;
    let deleteTask = await Task.deleteOne({ _id: taskId });
    if (!deleteTask) throw new Error("Task not deleted");
    let removeId = await User.findByIdAndUpdate(
      userId,
      { $pull: { tasks: taskId } },
      { new: true }
    );
    if (!removeId) throw new Error("error in deleteing task id in user");

    res.status(200).send({
      msg: "task deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getTaskCount = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    let taskCounts = await Task.aggregate([
      {
        $match: { user: userId },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          pending: {
            $sum: {
              $cond: [{ $eq: ["$_id", "pending"] }, "$count", 0],
            },
          },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$_id", "completed"] }, "$count", 0],
            },
          },
          canceled: {
            $sum: {
              $cond: [{ $eq: ["$_id", "cancelled"] }, "$count", 0],
            },
          },
        },
      },
    ]);

    res.json(taskCounts[0]);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const getSortedTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    let sortedTasks = await Task.aggregate([
      { $match: { user: userId } },
      {
        $project: {
          title: 1,
          description: 1,
          priority: 1,
          status: 1,
          order: {
            $cond: {
              if: { $eq: ["$status", "pending"] },
              then: 1,
              else: {
                $cond: {
                  if: { $eq: ["$status", "cancelled"] },
                  then: 2,
                  else: 3,
                },
              },
            },
          },
        },
      },
      { $sort: { order: 1 } },
      { $project: { title: 1, description: 1, priority: 1, status: 1 } },
    ]);
    res.json(sortedTasks);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
