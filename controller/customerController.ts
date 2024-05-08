import{Request,Response,} from 'express';
import { entityManager } from '../startup/database';
//import {Admin} from '../entities/admin'
//import jwt from 'jsonwebtoken';
//import passwordHash from 'password-hash';
import { Customer } from '../entities/customer';
//const adminSecreteKey='JWT_ADMIN_SECRETE_KEY';


class CustomerController{
constructor(){}
 
addCustomer =async(req:Request,res:Response)=>{
try{
const {first_name,last_name,email}=req.body;
const customer=entityManager.getRepository(Customer);
const customerExist=await customer.findOne({where:{email:email}});
if(customerExist) return res.status(401).send({message:'customer already exist'});
//const hashpassword=passwordHash.generate(password);
const customerData=await customer.save({first_name,last_name,email,created_at:new Date()});


return res.status(200).send({"message":"customer added successfully",data:customerData})
}
catch(error:any){
 return res.status(400).send({"error":error.message})
}
}
 getCustomer=async(req:Request,res:Response)=>{
    try{
    const customer=entityManager.getRepository(Customer);
    const customerData=await customer.find();
    return res.status(200).send({"message":"find customer data successfully ",customerData:customerData});
 }catch(error:any){
    res.status(400).send({"message":error.message});
 }
}


}
const customerController=new CustomerController;
export default customerController;