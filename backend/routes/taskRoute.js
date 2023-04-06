import express from 'express';
import { createTask, deleteTask, getAllTask, getSortedTask, getTaskCount, updateStatus } from '../controller/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.route('/createTask').post(protect,createTask);
router.route("/getAllTask").get(protect, getAllTask);
router.route("/getTaskCount").get(protect, getTaskCount);
router.route("/getSortedTask").get(protect, getSortedTask);
router.route("/updateStatus/:id").put(protect, updateStatus);
router.route("/deleteTask/:id").delete(protect, deleteTask);

export default router;