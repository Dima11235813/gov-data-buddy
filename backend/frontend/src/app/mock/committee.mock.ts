import { CommitteeDto, CommitteesResponseDto } from '@shared/Committee.model';

export const mockCommitteeSubcommittees = [
    {
        name: 'Investigations and Oversight Subcommittee',
        systemCode: 'hspw01',
        url: 'https://api.congress.gov/v3/committee/house/hspw01?format=json'
    },
    {
        name: 'Public Buildings and Grounds Subcommittee',
        systemCode: 'hspw04',
        url: 'https://api.congress.gov/v3/committee/house/hspw04?format=json'
    },
    {
        name: 'Economic Development Subcommittee',
        systemCode: 'hspw06',
        url: 'https://api.congress.gov/v3/committee/house/hspw06?format=json'
    }
];

export const mockCommitteeHistory = [
    {
        libraryOfCongressName: 'Transportation and Infrastructure',
        officialName: 'Committee on Transportation and Infrastructure',
        startDate: '1995-01-04T05:00:00Z',
        updateDate: '2020-02-14T19:13:07Z'
    },
    {
        endDate: '1995-01-03T05:00:00Z',
        libraryOfCongressName: 'Public Works and Transportation',
        officialName: 'Committee on Public Works and Transportation',
        startDate: '1975-01-01T05:00:00Z',
        updateDate: '2020-02-10T16:49:05Z'
    }
];

export const mockCommittees: CommitteeDto[] = [
    {
        id: 1,
        congress: 118,
        chamber: 'House',
        committeeTypeCode: 'Standing',
        name: 'Transportation and Infrastructure Committee',
        parent: null,
        subcommittees: mockCommitteeSubcommittees,
        systemCode: 'hspw00',
        updateDate: '2020-02-04T00:07:37Z',
        url: 'https://api.congress.gov/v3/committee/house/hspw00?format=json',
        isCurrent: true,
        bills: {
            count: 25384,
            url: 'https://api.congress.gov/v3/committee/house/hspw00/bills?format=json'
        },
        communications: {
            count: 6775,
            url: 'https://api.congress.gov/v3/committee/house/hspw00/house-communication?format=json'
        },
        reports: {
            count: 1382,
            url: 'https://api.congress.gov/v3/committee/house/hspw00/reports?format=json'
        },
        history: mockCommitteeHistory,
        type: 'Standing',
        createDate: new Date('2024-01-01T00:00:00Z'),
        updateDateColumn: new Date('2024-01-01T00:00:00Z')
    },
    {
        id: 2,
        congress: 118,
        chamber: 'House',
        committeeTypeCode: 'Standing',
        name: 'Appropriations Committee',
        parent: null,
        subcommittees: [],
        systemCode: 'hsap00',
        updateDate: '2020-02-04T00:07:37Z',
        url: 'https://api.congress.gov/v3/committee/house/hsap00?format=json',
        isCurrent: true,
        bills: {
            count: 15234,
            url: 'https://api.congress.gov/v3/committee/house/hsap00/bills?format=json'
        },
        communications: {
            count: 4234,
            url: 'https://api.congress.gov/v3/committee/house/hsap00/house-communication?format=json'
        },
        reports: {
            count: 892,
            url: 'https://api.congress.gov/v3/committee/house/hsap00/reports?format=json'
        },
        history: [],
        type: 'Standing',
        createDate: new Date('2024-01-01T00:00:00Z'),
        updateDateColumn: new Date('2024-01-01T00:00:00Z')
    },
    {
        id: 3,
        congress: 118,
        chamber: 'Senate',
        committeeTypeCode: 'Standing',
        name: 'Commerce, Science, and Transportation Committee',
        parent: null,
        subcommittees: [],
        systemCode: 'sscm00',
        updateDate: '2020-02-04T00:07:37Z',
        url: 'https://api.congress.gov/v3/committee/senate/sscm00?format=json',
        isCurrent: true,
        bills: {
            count: 8945,
            url: 'https://api.congress.gov/v3/committee/senate/sscm00/bills?format=json'
        },
        communications: {
            count: 2156,
            url: 'https://api.congress.gov/v3/committee/senate/sscm00/house-communication?format=json'
        },
        reports: {
            count: 567,
            url: 'https://api.congress.gov/v3/committee/senate/sscm00/reports?format=json'
        },
        history: [],
        type: 'Standing',
        createDate: new Date('2024-01-01T00:00:00Z'),
        updateDateColumn: new Date('2024-01-01T00:00:00Z')
    },
    {
        id: 4,
        congress: 118,
        chamber: 'Senate',
        committeeTypeCode: 'Standing',
        name: 'Armed Services Committee',
        parent: null,
        subcommittees: [],
        systemCode: 'ssas00',
        updateDate: '2020-02-04T00:07:37Z',
        url: 'https://api.congress.gov/v3/committee/senate/ssas00?format=json',
        isCurrent: true,
        bills: {
            count: 6789,
            url: 'https://api.congress.gov/v3/committee/senate/ssas00/bills?format=json'
        },
        communications: {
            count: 1234,
            url: 'https://api.congress.gov/v3/committee/senate/ssas00/house-communication?format=json'
        },
        reports: {
            count: 445,
            url: 'https://api.congress.gov/v3/committee/senate/ssas00/reports?format=json'
        },
        history: [],
        type: 'Standing',
        createDate: new Date('2024-01-01T00:00:00Z'),
        updateDateColumn: new Date('2024-01-01T00:00:00Z')
    },
    {
        id: 5,
        congress: 118,
        chamber: 'Joint',
        committeeTypeCode: 'Joint',
        name: 'Joint Committee on Taxation',
        parent: null,
        subcommittees: [],
        systemCode: 'jsct00',
        updateDate: '2020-02-04T00:07:37Z',
        url: 'https://api.congress.gov/v3/committee/joint/jsct00?format=json',
        isCurrent: true,
        bills: {
            count: 2345,
            url: 'https://api.congress.gov/v3/committee/joint/jsct00/bills?format=json'
        },
        communications: {
            count: 567,
            url: 'https://api.congress.gov/v3/committee/joint/jsct00/house-communication?format=json'
        },
        reports: {
            count: 123,
            url: 'https://api.congress.gov/v3/committee/joint/jsct00/reports?format=json'
        },
        history: [],
        type: 'Joint',
        createDate: new Date('2024-01-01T00:00:00Z'),
        updateDateColumn: new Date('2024-01-01T00:00:00Z')
    }
];

export const mockCommitteesResponse: CommitteesResponseDto = {
    committees: mockCommittees,
    pagination: {
        page: 1,
        limit: 20,
        total: 5,
        totalPages: 1
    }
};
