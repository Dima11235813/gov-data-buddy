import 'reflect-metadata';
import {
    Column,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class HouseTerm {
    @Column('integer', { nullable: true })
    end: number;

    @Column('integer', { nullable: true })
    start: number;
}

export class SenateTerm {
    @Column('integer', { nullable: true })
    end: number;

    @Column('integer', { nullable: true })
    start: number;
}

export class Served {
    @Column(type => HouseTerm)
    House?: HouseTerm[];

    @Column(type => SenateTerm)
    Senate?: SenateTerm[];
}
