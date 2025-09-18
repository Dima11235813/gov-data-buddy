import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Depiction } from './DepictionEntity';
import { Served } from './ServedEntity';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    @IsNotEmpty()
    searchQuery: string;

    @Column()
    @IsNotEmpty()
    bioguideId: string;

    @Column(type => Depiction)
    @ValidateNested()
    @Type(() => Depiction)
    depiction: Depiction;

    @Column({ nullable: true })
    district: string

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    party: string;

    @Column(type => Served)
    @ValidateNested()
    @Type(() => Served)
    served: Served;

    @Column()
    @IsNotEmpty()
    state: string;

    @UpdateDateColumn()
    updateDate: Date;

    @Column({ type: 'text' })
    url: string;
}
