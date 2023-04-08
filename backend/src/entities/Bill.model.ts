import { ILatestAction } from "./LatestAction.model";

export interface IBill {
    id: number;
    searchQuery: string;
    congress: number;
    number: string;
    originChamber: string;
    originChamberCode: string;
    title: string;
    type: string;
    createDate: Date;
    updateDate: Date;
    latestAction: ILatestAction;
    url: string;
}