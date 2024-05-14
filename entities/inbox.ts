import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Binary} from "typeorm";
  import {Customer} from './customer';
import { Task } from "./task";
//import { Contect } from "./contect";
   
    @Entity()
    export class Inbox{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public subject: string;
    
      @Column()
       public body: string;

      @Column()
       public email: string;

      @OneToOne(()=>Customer,(customer)=>customer.id,{cascade:true,eager:true})
      @JoinColumn({name:'customer_id'})
      public customer:Customer;
      
      @OneToMany(()=>Task,(task)=>task.email)
      @JoinColumn({name:'Task_id'})
       public task:Task;
       
       @Column()
      public status:Boolean;

      @Column()
      public created_at: Date;

      @Column()
      public updated_at: Date;
      
    }
