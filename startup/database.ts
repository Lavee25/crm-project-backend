import 'reflect-metadata';
import {DataSource} from 'typeorm';
import { Admin } from '../entities/admin';
import { Customer } from '../entities/customer';
import { Task } from '../entities/task';
import { Note } from '../entities/note';
import { Inbox } from '../entities/inbox';


export const AppDataSource=new DataSource({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"mini-crm-database",
    //entities:['enti-rel/*.ts'],
    entities:[Admin,Customer,Task,Inbox,Note],
    synchronize: true,
    logging:false,
   // migrationsTableName:"user_Pfile_migration_table",
   // migrations: ["migrations/*.ts"]

})
export const entityManager = AppDataSource.manager;


const dbConnections=()=>{
    AppDataSource.initialize().then(()=>{
        console.log('app connected to database')
    })
}
export default dbConnections;
