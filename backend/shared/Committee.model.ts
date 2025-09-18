import { ILatestAction } from "./LatestAction.model";

export enum CommitteePropEnum {
    id = "id",
    congress = "congress",
    chamber = "chamber",
    committeeTypeCode = "committeeTypeCode",
    name = "name",
    parent = "parent",
    subcommittees = "subcommittees",
    systemCode = "systemCode",
    updateDate = "updateDate",
    url = "url",
    isCurrent = "isCurrent",
    bills = "bills",
    communications = "communications",
    reports = "reports",
    history = "history",
    type = "type",
    searchQuery = "searchQuery",
    createDate = "createDate",
    updateDateColumn = "updateDateColumn"
}

export interface CommitteeSubcommitteeDto {
    name: string;
    systemCode: string;
    url: string;
}

export interface CommitteeHistoryDto {
    libraryOfCongressName?: string;
    officialName?: string;
    startDate?: string;
    endDate?: string;
    updateDate: string;
}

export interface CommitteeBillsDto {
    count: number;
    url: string;
}

export interface CommitteeCommunicationsDto {
    count: number;
    url: string;
}

export interface CommitteeReportsDto {
    count: number;
    url: string;
}

export interface CommitteeDto {
    [CommitteePropEnum.id]: number;
    [CommitteePropEnum.congress]?: number;
    [CommitteePropEnum.chamber]: string;
    [CommitteePropEnum.committeeTypeCode]: string;
    [CommitteePropEnum.name]: string;
    [CommitteePropEnum.parent]?: string | null;
    [CommitteePropEnum.subcommittees]?: CommitteeSubcommitteeDto[];
    [CommitteePropEnum.systemCode]: string;
    [CommitteePropEnum.updateDate]: string;
    [CommitteePropEnum.url]: string;
    [CommitteePropEnum.isCurrent]?: boolean;
    [CommitteePropEnum.bills]?: CommitteeBillsDto;
    [CommitteePropEnum.communications]?: CommitteeCommunicationsDto;
    [CommitteePropEnum.reports]?: CommitteeReportsDto;
    [CommitteePropEnum.history]?: CommitteeHistoryDto[];
    [CommitteePropEnum.type]?: string;
    [CommitteePropEnum.searchQuery]?: string;
    [CommitteePropEnum.createDate]: Date;
    [CommitteePropEnum.updateDateColumn]: Date;
}

export interface CommitteesResponseDto {
    committees: CommitteeDto[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface CommitteeDetailResponseDto {
    committee: CommitteeDto;
}