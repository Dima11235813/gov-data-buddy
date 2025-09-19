import { Depiction } from "./Depication.model";
import { Served } from "./Served.model";

export enum MemberPropEnum {
    bioguideId = "bioguideId",
    depiction = "depiction",
    district = "district",
    name = "name",
    party = "party",
    served = "served",
    state = "state",
    updateDate = "updateDate",
    url = "url",
    birthYear = "birthYear",
    cosponsoredLegislation = "cosponsoredLegislation",
    directOrderName = "directOrderName",
    firstName = "firstName",
    honorificName = "honorificName",
    invertedOrderName = "invertedOrderName",
    lastName = "lastName",
    leadership = "leadership",
    partyHistory = "partyHistory",
    sponsoredLegislation = "sponsoredLegislation",
    terms = "terms"
}

export interface CosponsoredLegislation {
    count: number;
    url: string;
}

export interface SponsoredLegislation {
    count: number;
    url: string;
}

export interface LeadershipRole {
    congress: number;
    type: string;
}

export interface PartyHistory {
    partyAbbreviation: string;
    partyName: string;
    startYear: number;
}

export interface Term {
    chamber: string;
    congress: number;
    endYear?: number;
    memberType: string;
    startYear: number;
    stateCode: string;
    stateName: string;
}

export interface MemberDto {
    [MemberPropEnum.bioguideId]: string;
    [MemberPropEnum.depiction]: Depiction;
    [MemberPropEnum.district]: string | null;
    [MemberPropEnum.name]: string;
    [MemberPropEnum.party]: string;
    [MemberPropEnum.served]: Served;
    [MemberPropEnum.state]: string;
    [MemberPropEnum.updateDate]: string;
    [MemberPropEnum.url]: string;
    [MemberPropEnum.birthYear]?: string;
    [MemberPropEnum.cosponsoredLegislation]?: CosponsoredLegislation;
    [MemberPropEnum.directOrderName]?: string;
    [MemberPropEnum.firstName]?: string;
    [MemberPropEnum.honorificName]?: string;
    [MemberPropEnum.invertedOrderName]?: string;
    [MemberPropEnum.lastName]?: string;
    [MemberPropEnum.leadership]?: LeadershipRole[];
    [MemberPropEnum.partyHistory]?: PartyHistory[];
    [MemberPropEnum.sponsoredLegislation]?: SponsoredLegislation;
    [MemberPropEnum.terms]?: Term[];
    currentPicture?: {
        id: number;
        base64Data?: string;
        contentType?: string;
        version: number;
        isCurrentVersion: boolean;
        attribution?: string;
    };
}
