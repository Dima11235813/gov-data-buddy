import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { LatestAction } from './LatestAction';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';




@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    searchQuery: string;

    @Column()
    congress: number;

    @Column()
    number: string;

    @Column()
    originChamber: string;

    @Column()
    originChamberCode: string;

    @Column()
    title: string;

    @Column()
    type: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @OneToOne(() => LatestAction, { cascade: true, eager: true }) //EXPLANATION OF THE OPTIONS: https://typeorm.io/#/one-to-one-relations
    //Explanation of cascase and eager: https://stackoverflow.com/questions/50093144/typeorm-what-does-cascade-true-mean    
    @JoinColumn()
    @ValidateNested()
    @Type(() => LatestAction)
    latestAction: LatestAction;

    @Column({ type: 'text' })
    url: string;
}