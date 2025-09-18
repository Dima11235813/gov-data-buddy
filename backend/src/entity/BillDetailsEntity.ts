import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';
import { ActionEntity } from './ActionEntity';
import { PolicyAreaEntity } from './PolicyAreaEntity';
import { SponsorEntity } from './SponsorEntity';
import { RequestEntity } from './RequestEntity';
import { CountAndUrlEntity } from './CountAndUrlEntity';
import { LatestActionEntity } from './LatestActionEntity';
import { CBOCostEstimateEntity } from './CboCostEstimateEntity';
import { CommitteeReport } from './CommitteeReportEntity';

@Entity()
export class BillDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => ActionEntity)
    @JoinColumn()
    actions: ActionEntity;

    @OneToOne(() => CBOCostEstimateEntity, { nullable: true })
    @JoinColumn()
    cboCostEstimates: CBOCostEstimateEntity;

    @OneToMany(() => CommitteeReport, committeeReport => committeeReport.id,  { nullable: true })
    @JoinColumn()
    committeeReports: CommitteeReport[];

    @OneToOne(() => CountAndUrlEntity)
    @JoinColumn()
    committees: CountAndUrlEntity;

    @Column()
    congress: number;

    @Column()
    introducedDate: string;

    @OneToOne(() => ActionEntity)
    @JoinColumn()
    latestAction: LatestActionEntity;

    @Column()
    number: string;

    @Column()
    originChamber: string;

    @OneToOne(() => CountAndUrlEntity)
    @JoinColumn()
    cosponsors: SponsorEntity;

    @Column()
    title: string;

    @OneToOne(() => CountAndUrlEntity)
    @JoinColumn()
    titles: CountAndUrlEntity;

    @Column()
    type: string;

    @Column()
    updateDate: string;

    @Column()
    updateDateIncludingText: string;

    @OneToOne(() => PolicyAreaEntity, { nullable: true })
    @JoinColumn()
    policyArea: PolicyAreaEntity;

    @OneToOne(() => CountAndUrlEntity, { nullable: true })
    @JoinColumn()
    relatedBills: CountAndUrlEntity;

    @OneToMany(() => SponsorEntity, sponsor => sponsor.id, { nullable: true })
    sponsors: SponsorEntity[];

    @OneToOne(() => CountAndUrlEntity, { nullable: true })
    @JoinColumn()
    subjects: CountAndUrlEntity;

    @OneToOne(() => CountAndUrlEntity, { nullable: true })
    @JoinColumn()
    textVersions: CountAndUrlEntity;






    @OneToOne(() => RequestEntity)
    @JoinColumn()
    request: RequestEntity;
}