import 'reflect-metadata';
import {
    Column,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class SenateTerm {
    @Column({ nullable: true })
    end: number

    @Column()
    @IsNotEmpty()
    start: number;
}

export class Served {
    @Column(type => SenateTerm)
    Senate: SenateTerm[];
}
