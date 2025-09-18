import { Action } from "./Action.model";
import { CountAndUrl } from "./CountAndUrl.model";
import { PolicyArea } from "./PolicyArea.model";
import { Sponsor } from "./Sponser.model";

export interface BillDetailDto {
    actions: CountAndUrl;
    committees: CountAndUrl;
    congress: number;
    cosponsors: CountAndUrl;
    introducedDate: string;
    latestAction: Action;
    number: string;
    originChamber: string;
    policyArea: PolicyArea;
    relatedBills: CountAndUrl;
    sponsors: Sponsor[];
    subjects: CountAndUrl;
    textVersions: CountAndUrl;
    title: string;
    titles: CountAndUrl;
    type: string;
    updateDate: string;
    updateDateIncludingText: string;
}

// export interface BillDetailDto {
//     bill: BillDetail;
//     request: Request;
// }
