import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export class RequestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    billNumber: string;

    @Column()
    billType: string;

    @Column()
    congress: string;

    @Column()
    contentType: string;

    @Column()
    format: string;
}
