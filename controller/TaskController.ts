import { Request,Response } from "express";
import { Task } from "../entities/task";
import { Inbox } from "../entities/inbox";
import { entityManager } from "../startup/database";

class TaskController{
    constructor(){}
      addTaskToEmail=async(req:Request,res:Response)=>{
       try {
        const{task_details}=req.body;
        const email_id =parseInt(req.params.id);

       
        const inboxRepository = entityManager.getRepository(Inbox);
        
       
        const inbox = await inboxRepository.findOne( {where:{ id: email_id }} );
        
       
        if (!inbox) {
          return res.status(404).send({ message: "Inbox not found" });
        }
        
        
        const task = new Task();
        task.task_details = task_details;
        
        task.email = inbox; 
        
      
        const taskRepository = entityManager.getRepository(Task);
        const savedTask = await taskRepository.save(task);
        
        
        return res.status(200).send({ message: "Task added successfully for this customer", taskdata: savedTask });
     
    } catch (error:any) {
        res.status(400).send({"message":error.message})
       }
      }
      getAllTasks=async(req:Request,res:Response)=>{
        try{
            const taskRepository=entityManager.getRepository(Task);
            const data=await taskRepository.find({relations: ['customer']})
            res.status(200).send({"message":"data find successfully",data:data});

        }catch(error:any){
            res.status(400).send({"message":error.message}) 
        }
      }
      deleteTask=async(req:Request,res:Response)=>{
          try{ 
            const taskRepository=entityManager.getRepository(Task);
            const task_id=parseInt(req.params.id);
            await taskRepository.delete({id:task_id}) 
            res.status(200).send({"message":"Task Deleted successfully"});

          }catch(error:any){
           res.status(400).send({"message":error.message}) 
          }

       }
      //  updateTask=async(req:Request,res:Response)=>{
      //    try{
      //       const taskRepository=entityManager.getRepository(Task);
      //       const task_id=parseInt(req.params.id);
      //       const{task_details,due_date,checked}=req.body;
      //       const updatedData= await taskRepository.update({id:task_id},{task_details:task_details,due_date:due_date,checked:checked}); 
      //       res.status(200).send({"message":"Task updated successfully",updateData:updatedData});

      //    }catch(error:any){
      //       res.status(400).send({"message":error.message}) 
      //    }
      //  }


    }


const taskController=new TaskController;
export default taskController;