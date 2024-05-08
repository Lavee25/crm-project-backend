import { Request,Response } from "express";
import {Customer} from "../entities/customer";
import { Inbox } from "../entities/inbox";
import { entityManager } from "../startup/database";


class InboxContoller{
    constructor(){}

SaveEmailAndCustomer=async(req:Request,res:Response)=>{
try {
    const{first_name,last_name,email,subject,body}=req.body;
    
    const inboxRepository=entityManager.getRepository(Inbox);

   const customer=new Customer();
   customer.first_name=first_name;
   customer.last_name=last_name;
   customer.email=email;
   customer.created_at=new Date();
   customer.updated_at=new Date();
   


   const inbox=new Inbox();
   inbox.subject=subject;
   inbox.body=body;
   inbox.customer =customer;
   inbox.email=email;
   inbox.created_at=new Date();
   inbox.updated_at=new Date();

   const savedInbox=await inboxRepository.save(inbox)
   return res.status(200).send({"message":"Thank you, Our team will contact you soon!",inboxData:savedInbox})
}catch(error:any){
    return res.status(400).send({"error":error.message})
}
}


GetEmailAndCustomer=async(req:Request,res:Response)=>{
try {
const inboxRepository=entityManager.getRepository(Inbox);
const data=await inboxRepository.find({relations: ['customer']})
res.status(200).send({"message":"data find successfully",data:data});

} catch (error:any) {
    res.status(400).send({"message":error.message})
    
}}
GetEmailbyId=async(req:Request,res:Response)=>{
   try{
    const emailId=parseInt(req.params.id);
    const inboxRepository=entityManager.getRepository(Inbox);
    const FindOptions={
       where:{id:emailId},
       relations: ['customer']

    }
    const data=await inboxRepository.findOne(FindOptions);
    res.status(200).send({"message":"data find successfully",data:data});
    
    } catch (error:any) {
        res.status(400).send({"message":error.message})
        
    }}



}
const inboxContoller= new InboxContoller;
export default inboxContoller;