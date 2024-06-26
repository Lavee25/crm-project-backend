import express from 'express';
const router=express.Router();
import customerController from '../controller/CustomerController';


router.post('/addCustomer',customerController.addCustomer);
router.get('/getCustomers',customerController.getAllCustomer);
router.get('/getCustomerbyname',customerController.findCustomerByName);

export default router;