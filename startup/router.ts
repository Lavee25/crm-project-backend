import express,{Request,Response} from 'express'
import authRoutes from '../routes/authRoutes'
import inboxRoutes from '../routes/inboxRoutes';
import taskRoutes from '../routes/taskRoutes';
import customerRoutes from '../routes/customerRoutes'



module.exports=((app:any)=>{
app.get('/',(req:Request,res:Response)=>{res.status(200).send({message:"welcome to app"})});  
app.use(express.json());
app.use('/api/v1/inbox',inboxRoutes)
app.use('/api/v1/admin',authRoutes)
app.use('/api/v1/customer',customerRoutes);
app.use('/api/v1/task',taskRoutes)


})