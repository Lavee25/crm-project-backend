import express from 'express';
import cors from 'cors';

const corsOptions={
   origin:'http://localhost:3001',
   methods:['GET,POST,PUT,PATCH,DELETE']
}



module.exports=(app:any)=>{
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
   
}