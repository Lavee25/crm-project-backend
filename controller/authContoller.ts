import{Request,Response,} from 'express';
import { entityManager } from '../startup/database';
import {Admin} from '../entities/admin'
import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
const adminSecreteKey='JWT_ADMIN_SECRETE_KEY';


class AuthController{
constructor(){}
 
adminSignup =async(req:Request,res:Response)=>{
try{
const {first_name,last_name,email,password}=req.body;
const admin=entityManager.getRepository(Admin);
const AdminExist=await admin.findOne({where:{email:email}});
if(AdminExist) return res.status(401).send({message:'admin already exist'});
const hashpassword=passwordHash.generate(password);
const adminData=await admin.save({first_name,last_name,email,password:hashpassword});
const userId=adminData.id;
const token=jwt.sign({id:userId},adminSecreteKey); 

return res.status(200).send({"message":"admin Signup successfully",data:adminData})
}
catch(error:any){
// return res.status(400).send({"error":error.message})
}
}
adminLogin=async(req:Request,res:Response)=>{
    try{
        const{email,password}=req.body;
        const adminRepository=entityManager.getRepository(Admin);
        //console.log(admin);
        const admin=await adminRepository.findOne({where:{email:email}});
        if(!admin)return res.status(401).send('admin not exist');
        const validPassword=passwordHash.verify(password,admin.password);
         if(!validPassword)return res.status(404).send("Invalid password");
        const adminId = admin.id;

        const token = jwt.sign({id:adminId}, adminSecreteKey);//,{expiresIn:"10m"}
        
        return res.status(200).send({message:"admin login successfully",data:admin,adminToken:token})
        }
    catch(error:any){
        res.status(404).send({message:"error",error:error.message});
     }
}


}
const authController=new AuthController;
export default authController;