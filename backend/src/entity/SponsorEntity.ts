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

    @Column()
    lastName: string;

    @Column()
    party: string;

    @Column()
    state: string;

    @Column()
    url: string;
}