import express from 'express';
const app=express();
require('dotenv').config();
const port=process.env.PORT;
import db from './startup/database'
db();
require ('./startup/router')(app);
require('./startup/middleware')(app);

app.listen(port,()=>{
  console.log(`server started on port ${port}`)
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              