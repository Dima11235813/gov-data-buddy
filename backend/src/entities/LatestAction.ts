// entities/LatestAction.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class LatestAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  actionDate: string;

  @Column()
  @IsNotEmpty()
  text: string;
}