import express from "express";
import {protect} from "../middlewares/authMiddleware";
import {destroy, index, show, store, update} from "../controllers/taskController";
import {validateRequest} from "../middlewares/validateMiddleware";
import {taskValidator, updateTaskValidator} from "../validators/taskValidator";

const router = express.Router();

router.use(protect);

router.post("/", validateRequest(taskValidator) ,store)
router.get("/", index)
router.get("/:id", show)
router.put("/update/:id", validateRequest(updateTaskValidator) ,update)
router.delete("/:id", destroy)

export default router;