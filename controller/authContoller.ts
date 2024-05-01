import{Request,Response,} from 'express';
import { entityManager } from '../startup/database';
import {Admin} from '../entities/admin'

class AdminController{
constructor(){}
 
adminSignup =async(req:Request,res:Response)=>{
try{
const {first_name,last_name,email,password}=req.body;
const admin=entityManager.getRepository(Admin);
const adminData=await admin.save({first_name,last_name,email,password});
console.log(adminData);
return res.status(200).send({"message":"admin Signup successfully",data:adminData})
}
catch(error:any){
return res.status(400).send({"error":error.message})
}

}
}
const adminController=new AdminController;
export default adminController;