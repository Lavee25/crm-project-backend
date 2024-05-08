import express from 'express';
import cors from 'cors';

const corsOptions={
   origin:'http://localhost:3001',
   methods:['GET,POST,PUT,DELETE']
}



module.exports=(app:any)=>{
   app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))
   // app.use(express.static('public'));
}