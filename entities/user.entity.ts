import "reflect-metadata";

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsString()
  @Length(2, 40)
  name: string;

  @Column({ type: 'varchar' })
  @IsEmail()
  @Length(5, 128)
  email: string;

  @Column({ type: 'varchar' })
  @IsStrongPassword()
  @Length(8, 100)
  password: string;
}