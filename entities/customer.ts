import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    } from "typeorm";
    import {Task} from './task';
   
    @Entity()
    export class Customer{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public first_name: string;
    
       @Column()
       public last_name : string;

       @Column()
       public email: string;

     //    @OneToOne(()=>Task,{cascade:true,eager:true})
     //    @JoinColumn({name:'task_id'})
     //    public task:Task;

       @Column() 
       public ceated_at:Date;
       
       @Column()
       public updated_at:Date;


      
    }
