import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class CountAndUrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;

    @Column()
    url: string;
}
