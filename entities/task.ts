import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
   } from "typeorm";
   import {Customer} from "./customer";
   
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
       public ceated_at:Date;
       
       @Column()
       public updated_at:Date;

       @ManyToOne(()=>Customer,{cascade:true,eager:true})
       @JoinColumn({name:'customer_id'})
       public customer:Customer
    
    }
