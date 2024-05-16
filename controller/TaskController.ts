import { Request, Response } from "express";
import { Task } from "../entities/task";
import { Inbox } from "../entities/inbox";
import { entityManager } from "../startup/database";

class TaskController {
  constructor() { }
  addTaskToEmail = async (req: Request, res: Response) => {
    try {
      const { task_details, due_date } = req.body;
      const email_id = parseInt(req.params.id);
      const inboxRepository = entityManager.getRepository(Inbox);
      const inbox = await inboxRepository.findOne({ where: { id: email_id } });
      if (!inbox) {
        return res.status(404).send({ message: "Inbox not found" });
      }
      const task = new Task();
      task.task_details = task_details;
      task.due_date = due_date;
      task.created_at = new Date();
      task.email = inbox;


      const taskRepository = entityManager.getRepository(Task);
      const savedTask = await taskRepository.save(task);


      return res.status(200).send({ message: "Task added successfully for this customer", taskdata: savedTask });

    } catch (error: any) {
      res.status(400).send({ "message": error.message })
    }
  }
  getAllTasks = async (req: Request, res: Response) => {
    try {
      const defaultpage = 1;
      const defaultsize = 10;

      const pageQuery = parseInt(req.query.page as string, 10);
      const sizeQuery = parseInt(req.query.size as string, 10);

      const page = isNaN(pageQuery) ? defaultpage : Math.max(1, pageQuery); // Ensure page is at least 1
      const size = isNaN(sizeQuery) ? defaultsize : Math.max(1, sizeQuery); // Ensure size is at least 1

      const skip = (page - 1) * size
      const queryOptions = {
        relations: ['email'],
        skip: skip,
        take: size,
      };
      const taskRepository = entityManager.getRepository(Task);
      const taskdata = await taskRepository.find(queryOptions);
      const totalRecords = await taskRepository.count();
      res.status(200).send({ "message": "data find successfully", taskdata: taskdata, page: page, size: size, totalRecords: totalRecords });

    } catch (error: any) {
      res.status(400).send({ "message": error.message })
    }
  }

  findTaskByEmail = async (req: Request, res: Response) => {
    try {
      const task = req.query.task_details as string;
      const taskRepository = entityManager.getRepository(Task);
      const tasks = await taskRepository.find({
        relations: ['email'],
        where: { task_details: task }
      });

      return res.status(200).send({ message: 'Task data found successfully', taskdata: tasks });
    } catch (error: any) {
      return res.status(500).send({ message: error.message });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    try {
      const taskRepository = entityManager.getRepository(Task);
      const task_id = parseInt(req.params.id);
      await taskRepository.delete({ id: task_id })
      res.status(200).send({ "message": "Task Deleted successfully" });

    } catch (error: any) {
      res.status(400).send({ "message": error.message })
    }

  }
  ChangeTaskStatus = async (req: Request, res: Response) => {
    try {
        const { checked } = req.body;
        const id = parseInt(req.params.id);
        const taskRepository = entityManager.getRepository(Task);
        const result = await taskRepository.update({ id: id }, { checked:checked });
        if (result.affected === 1) {
            res.status(200).json({ message: 'task status updated successfully' });
        } else {
            res.status(404).json({ message: 'task not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the task status' });
    }

};


}


const taskController = new TaskController;
export default taskController;