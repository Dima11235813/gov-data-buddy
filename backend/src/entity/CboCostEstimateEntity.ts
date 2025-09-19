import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { BillDetailsEntity } from './BillDetailsEntity';

@Entity()
export class CBOCostEstimateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    description: string;

    @CreateDateColumn()
    pubDate: Date;

    @Column()
    title: string;

    @Column({ type: 'text' })
    url: string;

    @ManyToOne(() => BillDetailsEntity, billDetails => billDetails.cboCostEstimates, { nullable: true })
    billDetails?: BillDetailsEntity;
}