import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

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
}