import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    } from "typeorm";
  
   
    @Entity()
    export class Customer {
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public first_name: string;
    
       @Column()
       public last_name : string;

       @Column()
       public email: string;

       @Column() 
       public created_at:Date;
       
       @Column()
       public updated_at:Date;


      
    }
