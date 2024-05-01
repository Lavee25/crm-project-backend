import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn} from "typeorm";
    import {Customer} from './customer';
   
    @Entity()
    export class Note{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public first_name: string;
    
       @Column()
       public last_name : string;
        
       @Column()
       public email: string;

       @OneToOne(()=>Customer,{cascade:true,eager:true})
       @JoinColumn({name:'customer_id'})
       public task:Customer;

       @Column() 
       public ceated_at:Date;
       
       @Column()
       public updated_at:Date;


      
    }
