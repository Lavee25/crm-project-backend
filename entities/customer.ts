import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
   
    } from "typeorm";
    import {Task} from './task';
   
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

      // @OneToMany(()=>Task,(task)=>task.email)
      // @JoinColumn({name:'task_id'})
      //  public task:Task;

      //  @Column()
      //  public status:boolean

       @Column() 
       public created_at:Date;
       
       @Column()
       public updated_at:Date;


      
    }
