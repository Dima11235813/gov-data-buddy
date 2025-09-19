import 'reflect-metadata';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Member } from './MemberEntity';
import { IsNotEmpty } from 'class-validator';

export enum PictureSource {
    CONGRESS_GOV = 'congress_gov',
    OTHER = 'other'
}

export enum PictureStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted'
}

@Entity('member_pictures')
export class MemberPicture {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    bioguideId: string;

    @ManyToOne(() => Member, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'memberId' })
    member: Member;

    @Column({ nullable: true })
    memberId: number;

    @Column({ type: 'text' })
    @IsNotEmpty()
    originalUrl: string;

    @Column({ type: 'text', nullable: true })
    base64Data?: string;

    @Column({ type: 'text', nullable: true })
    contentType?: string;

    @Column({ type: 'integer', nullable: true })
    fileSize?: number;

    @Column({
        type: 'varchar',
        length: 20,
        default: PictureSource.CONGRESS_GOV
    })
    source: PictureSource;

    @Column({
        type: 'varchar',
        length: 20,
        default: PictureStatus.ACTIVE
    })
    status: PictureStatus;

    @Column({ type: 'text', nullable: true })
    attribution?: string;

    @Column({ type: 'text', nullable: true })
    caption?: string;

    @Column({ type: 'json', nullable: true })
    metadata?: {
        width?: number;
        height?: number;
        checksum?: string;
        sourceUpdatedAt?: string;
    };

    @Column({ type: 'int', default: 1 })
    version: number;

    @Column({ nullable: true })
    @Index()
    checksum?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    sourceLastModified?: Date;

    @Column({ type: 'boolean', default: false })
    isCurrentVersion: boolean;
}
