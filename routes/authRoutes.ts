import express from 'express';
const router=express.Router();
import adminController from '../controller/authContoller';


router.post('/adminSignup',adminController.adminSignup);
export default router;