import { Action } from "./Action.model";
import { CountAndUrl } from "./CountAndUrl.model";
import { PolicyArea } from "./PolicyArea.model";
import { Sponsor } from "./Sponser.model";
import { CommitteeReport } from "./CommitteeReport.model";
import { ICBOCostEstimate as CboCostEstimate } from "./CboCostEstimate.model";

export enum BillDetailPropEnum {
    actions = "actions",
    amendments = "amendments",
    cboCostEstimates = "cboCostEstimates",
    committeeReports = "committeeReports",
    committees = "committees",
    congress = "congress",
    cosponsors = "cosponsors",
    introducedDate = "introducedDate",
    latestAction = "latestAction",
    laws = "laws",
    number = "number",
    originChamber = "originChamber",
    originChamberCode = "originChamberCode",
    policyArea = "policyArea",
    relatedBills = "relatedBills",
    sponsors = "sponsors",
    subjects = "subjects",
    summaries = "summaries",
    textVersions = "textVersions",
    title = "title",
    titles = "titles",
    type = "type",
    updateDate = "updateDate",
    updateDateIncludingText = "updateDateIncludingText"
}

export interface BillDetailDto {
    [BillDetailPropEnum.actions]: CountAndUrl;
    [BillDetailPropEnum.amendments]?: CountAndUrl;
    [BillDetailPropEnum.cboCostEstimates]?: CboCostEstimate[];
    [BillDetailPropEnum.committeeReports]?: CommitteeReport[];
    [BillDetailPropEnum.committees]: CountAndUrl;
    [BillDetailPropEnum.congress]: number;
    [BillDetailPropEnum.cosponsors]?: CountAndUrl;
    [BillDetailPropEnum.introducedDate]: string;
    [BillDetailPropEnum.latestAction]: Action;
    [BillDetailPropEnum.laws]?: any[];
    [BillDetailPropEnum.number]: string;
    [BillDetailPropEnum.originChamber]: string;
    [BillDetailPropEnum.originChamberCode]?: string;
    [BillDetailPropEnum.policyArea]?: PolicyArea;
    [BillDetailPropEnum.relatedBills]?: CountAndUrl;
    [BillDetailPropEnum.sponsors]: Sponsor[];
    [BillDetailPropEnum.subjects]?: CountAndUrl;
    [BillDetailPropEnum.summaries]?: CountAndUrl;
    [BillDetailPropEnum.textVersions]?: CountAndUrl;
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
