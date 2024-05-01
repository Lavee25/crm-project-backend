import {
    Entity,
    Column,
    PrimaryGeneratedColumn} from "typeorm";

   
    @Entity()
    export class Admin{
      @PrimaryGeneratedColumn()
       public id: number;
    
      @Column()
       public first_name: string;
    
       @Column()
       public last_name: string;
        
       @Column()
       public email: string;

       @Column()
       public password: string;
    }