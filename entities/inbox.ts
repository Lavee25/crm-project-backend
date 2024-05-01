import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn} from "typeorm";
    import {Customer} from './customer';
   
    @Entity()
    export class Inbox{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public subject: string;
    
       @Column()
       public body: string;
        
       @Column()
       public from: string;

       @OneToOne(()=>Customer,{cascade:true,eager:true})
       @JoinColumn({name:'customer_id'})
       public task:Customer;

       


      
    }
