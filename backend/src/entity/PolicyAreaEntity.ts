import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export class PolicyAreaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
