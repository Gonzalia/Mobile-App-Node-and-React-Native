import { Router } from "express";
import { authRequired } from "../middlewares/ValidateToken.js";
import {
  createTask,
  deleteTask,
  getTaskByID,
  getTasks,
  updateTask,
} from "../controllers/task.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { taskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskByID);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);

export default router;
