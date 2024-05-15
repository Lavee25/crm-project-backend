import express from 'express';
const router=express.Router();
import taskController from '../controller/TaskController';


router.post('/addTask/:id',taskController.addTaskToEmail);
router.get('/getTasks',taskController.getAllTasks);
router.delete('/deleteTask/:id',taskController.deleteTask);
router.get('/getTasksbyEmail',taskController.findTaskByEmail);
//router.put('/updateTask/:id',taskController.updateTask);
export default router;