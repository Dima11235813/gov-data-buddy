import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export class SponsorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bioguideId: string;

    @Column()
    district: number;

    @Column()
    firstName: string;

    @Column()
    fullName: string;

    @Column()
    isByRequest: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    middleName?: string;

    @Column()
    party: string;

    @Column()
    state: string;

    @Column()
    url: string;
}