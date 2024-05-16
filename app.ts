import 'reflect-metadata';
import express from 'express';
const app=express();
require('dotenv').config();
const port=process.env.PORT;
import db from './startup/database';
db();
require('./startup/middleware')(app);
require ('./startup/router')(app);

app.listen(port,()=>{
  console.log(`server started on port ${port}`)
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              