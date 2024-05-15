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

findCustomerByName=async(req:Request,res:Response)=>{
   try{
     // const {first_name}=req.body;
      const customerName = req.query.name as string; 
      const customerReposiratiry=await entityManager.getRepository(Customer);
      const customer= await customerReposiratiry.find({where:{first_name:customerName}});
      if(!customer) return  res.status(401).send({message:'customer not exist'});
      return  res.status(200).send({'message':'customer data find sucessfully',customerData:customer});
   }catch(error:any){
    return res .status(200).send({'message':error.message})
   }
}
 getAllCustomer=async(req:Request,res:Response)=>{
    try{
      const defaultpage=1;
      const defaultsize=10;

      const pageQuery = parseInt(req.query.page as string, 10);
          const sizeQuery = parseInt(req.query.size as string, 10);
  
          const page = isNaN(pageQuery) ? defaultpage : Math.max(1, pageQuery); // Ensure page is at least 1
          const size = isNaN(sizeQuery) ? defaultsize : Math.max(1, sizeQuery); // Ensure size is at least 1
  
          const skip=(page-1) * size
          const queryOptions = {
            // relations: ['email'],
            skip: skip,
            take: size,
        };
   const customer=entityManager.getRepository(Customer);
   const customerData=await customer.find(queryOptions );
   const totalRecords=await customer.count();
    return res.status(200).send({"message":"find customer data successfully ",customerData:customerData,page:page,size:size,totalRecords:totalRecords});
 }catch(error:any){
    res.status(400).send({"message":error.message});
 }
}



}
const customerController=new CustomerController;
export default customerController;