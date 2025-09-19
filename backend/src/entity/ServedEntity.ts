import 'reflect-metadata';
import { Column } from 'typeorm';

export interface HouseTerm {
    end: number | null;
    start: number;
}

export interface SenateTerm {
    end: number | null;
    start: number;
}

export class Served {
    @Column({ type: 'json', nullable: true })
    House?: HouseTerm[];

    @Column({ type: 'json', nullable: true })
    Senate?: SenateTerm[];
}
