import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export class ActionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;

    @Column()
    url: string;
}