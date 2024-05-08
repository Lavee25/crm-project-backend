import express,{Request,Response} from 'express';
const router=express.Router();
import inboxController from '../controller/InboxController';


router.post('/aboutyou',inboxController.SaveEmailAndCustomer); 
router.get('/getemailCustomerData',inboxController.GetEmailAndCustomer); 
router.get('/getemailCustomerData/:id',inboxController.GetEmailbyId); 


export default router;