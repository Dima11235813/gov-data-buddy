// entities/LatestAction.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class LatestActionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  actionDate: string;

  @Column({ nullable: true })
  @IsOptional()
  actionTime?: string;

  @Column()
  @IsNotEmpty()
  text: string;
}