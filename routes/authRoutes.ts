import express from 'express';
const router=express.Router();
import authController from '../controller/AuthContoller';



router.post('/adminLogin',authController.adminLogin);
export default router;