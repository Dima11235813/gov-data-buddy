import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Member } from './MemberEntity';

@Entity()
export class Term {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    chamber: string; // 'House' | 'Senate'

    @Column('integer')
    @IsNotEmpty()
    startYear: number;

    @Column('integer', { nullable: true })
    endYear: number | null;

    @ManyToOne(() => Member, (member) => member.terms, { onDelete: 'CASCADE' })
    member: Member;
}


