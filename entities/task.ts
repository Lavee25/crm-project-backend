import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
   } from "typeorm";
import { Inbox } from "./inbox";
   
    @Entity()
    export class Task{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public task_details: string;
    
      @Column()
       public due_date: Date;
        
       @Column()
       public checked: boolean;

       @Column() 
       public created_at:Date;
       
        @Column()
        public updated_at:Date;

       @ManyToOne(()=>Inbox,(inbox)=>inbox.task)
       @JoinColumn({name:'email_id'})
       public email:Inbox;
    
    }
