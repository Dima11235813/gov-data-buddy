import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { BillDetailsEntity } from './BillDetailsEntity';

@Entity()
export class CommitteeReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    citation: string;

    @Column({ type: 'text' })
    url: string;

    @ManyToOne(() => BillDetailsEntity, billDetails => billDetails.committeeReports, { nullable: true })
    billDetails: BillDetailsEntity;
}
