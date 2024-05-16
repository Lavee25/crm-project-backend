import express from 'express';
const router=express.Router();
import taskController from '../controller/TaskController';


router.post('/addTask/:id',taskController.addTaskToEmail);
router.get('/getTasks',taskController.getAllTasks);
router.delete('/deleteTask/:id',taskController.deleteTask);
router.get('/getTasksbyEmail',taskController.findTaskByEmail);
router.patch('/changeTaskstatus/:id',taskController.ChangeTaskStatus);
export default router;