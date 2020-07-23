import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;            

    @Column({unique: true, nullable: false})
    comment: string;    

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;        

}