import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { CommitteePropEnum } from '../../shared/Committee.model';
import { Type } from 'class-transformer';
import { CommitteeReport } from './CommitteeReportEntity';

export class CommitteeSubcommitteeEntity {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    systemCode: string;

    @IsString()
    @IsNotEmpty()
    url: string;
}

export class CommitteeHistoryEntity {
    @IsString()
    @IsOptional()
    libraryOfCongressName?: string;

    @IsString()
    @IsOptional()
    officialName?: string;

    @IsString()
    @IsOptional()
    startDate?: string;

    @IsString()
    @IsOptional()
    endDate?: string;

    @IsString()
    @IsNotEmpty()
    updateDate: string;
}

export class CommitteeBillsEntity {
    @IsNumber()
    @IsNotEmpty()
    count: number;

    @IsString()
    @IsNotEmpty()
    url: string;
}

export class CommitteeCommunicationsEntity {
    @IsNumber()
    @IsNotEmpty()
    count: number;

    @IsString()
    @IsNotEmpty()
    url: string;
}

export class CommitteeReportsEntity {
    @IsNumber()
    @IsNotEmpty()
    count: number;

    @IsString()
    @IsNotEmpty()
    url: string;
}

@Entity()
export class CommitteeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    @IsOptional()
    @IsNumber()
    congress?: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    chamber: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    committeeTypeCode: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({ type: 'varchar', nullable: true })
    @IsOptional()
    @IsString()
    parent?: string | null;

    @Column('simple-json', { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommitteeSubcommitteeEntity)
    subcommittees?: CommitteeSubcommitteeEntity[];

    @Column()
    @IsNotEmpty()
    @IsString()
    systemCode: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    updateDate: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    url: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    type?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsBoolean()
    isCurrent?: boolean;

    @Column('simple-json', { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => CommitteeBillsEntity)
    bills?: CommitteeBillsEntity;

    @Column('simple-json', { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => CommitteeCommunicationsEntity)
    communications?: CommitteeCommunicationsEntity;

    @Column('simple-json', { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => CommitteeReportsEntity)
    reports?: CommitteeReportsEntity;

    @Column('simple-json', { nullable: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CommitteeHistoryEntity)
    history?: CommitteeHistoryEntity[];

    // For caching/search purposes
    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    searchQuery?: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDateColumn: Date;

    // Note: Committee reports are accessed through BillDetailsEntity relationships

    // Helper method to convert to DTO
    toDto(): any {
        return {
            [CommitteePropEnum.id]: this.id,
            [CommitteePropEnum.congress]: this.congress,
            [CommitteePropEnum.chamber]: this.chamber,
            [CommitteePropEnum.committeeTypeCode]: this.committeeTypeCode,
            [CommitteePropEnum.name]: this.name,
            [CommitteePropEnum.parent]: this.parent,
            [CommitteePropEnum.subcommittees]: this.subcommittees,
            [CommitteePropEnum.systemCode]: this.systemCode,
            [CommitteePropEnum.updateDate]: this.updateDate,
            [CommitteePropEnum.url]: this.url,
            [CommitteePropEnum.isCurrent]: this.isCurrent,
            [CommitteePropEnum.bills]: this.bills,
            [CommitteePropEnum.communications]: this.communications,
            [CommitteePropEnum.reports]: this.reports,
            [CommitteePropEnum.history]: this.history,
            [CommitteePropEnum.type]: this.type,
            [CommitteePropEnum.createDate]: this.createDate,
            [CommitteePropEnum.updateDateColumn]: this.updateDateColumn,
        };
    }
}
