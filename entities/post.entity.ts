import "reflect-metadata";

import { IsString, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsString()
  @Length(2, 150)
  title: string;

  @Column({ type: 'text' })
  @IsString()
  @Length(5, 1500)
  content: string;
}