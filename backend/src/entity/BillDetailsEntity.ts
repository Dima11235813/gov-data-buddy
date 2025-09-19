import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { CBOCostEstimateEntity } from './CboCostEstimateEntity';
import { CommitteeReport } from './CommitteeReportEntity';

@Entity()
export class BillDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-json', { nullable: true })
    actions?: { count: number; url: string };

    @Column('simple-json', { nullable: true })
    amendments?: { count: number; url: string };

    @OneToMany(() => CBOCostEstimateEntity, cboCostEstimate => cboCostEstimate.billDetails, { cascade: true, nullable: true })
    cboCostEstimates?: CBOCostEstimateEntity[];

    @OneToMany(() => CommitteeReport, committeeReport => committeeReport.billDetails, { cascade: true, nullable: true })
    committeeReports?: CommitteeReport[];

    @Column('simple-json', { nullable: true })
    committees?: { count: number; url: string };

    @Column()
    congress: number;

    @Column()
    introducedDate: string;

    @Column('simple-json')
    latestAction: { actionDate: string; text: string };

    @Column()
    number: string;

    @Column()
    originChamber: string;

    @Column({ nullable: true })
    originChamberCode?: string;

    @Column('simple-json', { nullable: true })
    laws?: any[];

    @Column()
    legislationUrl: string;

    @Column('simple-json', { nullable: true })
    cosponsors?: { count: number; url: string };

    @Column()
    title: string;

    @Column('simple-json')
    titles: { count: number; url: string };

    @Column()
    type: string;

    @Column()
    updateDate: string;

    @Column()
    updateDateIncludingText: string;

    @Column('simple-json', { nullable: true })
    policyArea?: { name: string };

    @Column('simple-json', { nullable: true })
    relatedBills?: { count: number; url: string };

    @Column('simple-json', { nullable: true })
    sponsors?: Array<{
        bioguideId: string;
        district: number;
        firstName: string;
        fullName: string;
        isByRequest: string;
        lastName: string;
        middleName?: string;
        party: string;
        state: string;
        url: string;
    }>;

    @Column('simple-json', { nullable: true })
    subjects?: { count: number; url: string };

    @Column('simple-json', { nullable: true })
    summaries?: { count: number; url: string };

    @Column('simple-json', { nullable: true })
    textVersions?: { count: number; url: string };

}