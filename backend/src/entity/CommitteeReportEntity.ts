import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommitteeReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    citation: string;

    @Column({ type: 'text' })
    url: string;
}
