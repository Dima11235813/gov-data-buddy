import { Action } from "./Action.model";
import { CountAndUrl } from "./CountAndUrl.model";
import { PolicyArea } from "./PolicyArea.model";
import { Sponsor } from "./Sponser.model";

export enum BillDetailPropEnum {
    actions = "actions",
    committees = "committees",
    congress = "congress",
    cosponsors = "cosponsors",
    introducedDate = "introducedDate",
    latestAction = "latestAction",
    number = "number",
    originChamber = "originChamber",
    policyArea = "policyArea",
    relatedBills = "relatedBills",
    sponsors = "sponsors",
    subjects = "subjects",
    textVersions = "textVersions",
    title = "title",
    titles = "titles",
    type = "type",
    updateDate = "updateDate",
    updateDateIncludingText = "updateDateIncludingText"
}

export interface BillDetailDto {
    [BillDetailPropEnum.actions]: CountAndUrl;
    [BillDetailPropEnum.committees]: CountAndUrl;
    [BillDetailPropEnum.congress]: number;
    [BillDetailPropEnum.cosponsors]: CountAndUrl;
    [BillDetailPropEnum.introducedDate]: string;
    [BillDetailPropEnum.latestAction]: Action;
    [BillDetailPropEnum.number]: string;
    [BillDetailPropEnum.originChamber]: string;
    [BillDetailPropEnum.policyArea]: PolicyArea;
    [BillDetailPropEnum.relatedBills]: CountAndUrl;
    [BillDetailPropEnum.sponsors]: Sponsor[];
    [BillDetailPropEnum.subjects]: CountAndUrl;
    [BillDetailPropEnum.textVersions]: CountAndUrl;
    [BillDetailPropEnum.title]: string;
    [BillDetailPropEnum.titles]: CountAndUrl;
    [BillDetailPropEnum.type]: string;
    [BillDetailPropEnum.updateDate]: string;
    [BillDetailPropEnum.updateDateIncludingText]: string;
}

// export interface BillDetailDto {
//     bill: BillDetail;
//     request: Request;
// }
