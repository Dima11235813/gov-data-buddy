import 'reflect-metadata';
import {
    Column
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

export class Depiction {
    @Column()
    @IsNotEmpty()
    attribution: string;

    @Column()
    @IsNotEmpty()
    imageUrl: string;
}
