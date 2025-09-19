import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index
} from 'typeorm';
import { GovApiQuery } from './GovApiQuery';
import { Depiction } from './DepictionEntity';
import { Served } from './ServedEntity';
import { Term } from './TermEntity';
import { MemberPicture } from './MemberPictureEntity';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @Index()
    queryId?: string;

    @ManyToOne(() => GovApiQuery, { nullable: true })
    @JoinColumn({ name: 'queryId' })
    query?: GovApiQuery;

    @Column()
    @IsNotEmpty()
    bioguideId: string;

    @Column(type => Depiction)
    @ValidateNested()
    @Type(() => Depiction)
    depiction: Depiction;

    @Column({ nullable: true })
    district: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({ nullable: true })
    party: string;

    @Column(type => Served)
    @ValidateNested()
    @Type(() => Served)
    served: Served;

    @Column()
    @IsNotEmpty()
    state: string;

    @UpdateDateColumn()
    updateDate: Date;

    @Column({ type: 'text' })
    url: string;

    // Additional fields from Congress.gov API
    @Column({ nullable: true })
    birthYear?: string;

    @Column({ nullable: true })
    directOrderName?: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    honorificName?: string;

    @Column({ nullable: true })
    invertedOrderName?: string;

    @Column({ nullable: true })
    lastName?: string;

    // JSON columns for complex objects
    @Column({ type: 'json', nullable: true })
    cosponsoredLegislation?: {
        count: number;
        url: string;
    };

    @Column({ type: 'json', nullable: true })
    sponsoredLegislation?: {
        count: number;
        url: string;
    };

    @Column({ type: 'json', nullable: true })
    leadership?: Array<{
        congress: number;
        type: string;
    }>;

    @Column({ type: 'json', nullable: true })
    partyHistory?: Array<{
        partyAbbreviation: string;
        partyName: string;
        startYear: number;
    }>;

    // Current profile picture relationship
    currentPicture?: MemberPicture;

    // Optional normalized terms table for reliable validation and queries
    terms?: Term[];
}
