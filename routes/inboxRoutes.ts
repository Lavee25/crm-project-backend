import express,{Request,Response} from 'express';
const router=express.Router();
import inboxController from '../controller/InboxController';


router.post('/aboutyou',inboxController.SaveEmailAndCustomer); 
router.get('/getemailCustomerData',inboxController.GetEmailAndCustomer); 



export default router;