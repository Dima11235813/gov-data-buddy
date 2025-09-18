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
}
