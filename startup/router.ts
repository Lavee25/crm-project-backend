import express,{Request,Response} from 'express'
import authRoutes from '../routes/authRoutes'



module.exports=((app:any)=>{
app.get('/',(req:Request,res:Response)=>{res.status(200).send({message:"welcome to app"})});  
app.use(express.json());
app.use('/api/v1/admin',authRoutes)
//app.use('/api/v1/customer',);
//app.use('/api/v1/task',)


})