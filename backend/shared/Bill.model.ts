import { ILatestAction } from "./LatestAction.model";
export enum BillPropEnum {
    id = "id",
    searchQuery = "searchQuery",
    congress = "congress",
    number = "number",
    originChamber = "originChamber",
    originChamberCode = "originChamberCode",
    title = "title",
    type = "type",
    createDate = "createDate",
    updateDate = "updateDate",
    latestAction = "latestAction",
    url = "url",
}

export interface IBill {
    [BillPropEnum.id]: number;
    [BillPropEnum.searchQuery]: string;
    [BillPropEnum.congress]: number;
    [BillPropEnum.number]: string;
    [BillPropEnum.originChamber]: string;
    [BillPropEnum.originChamberCode]: string;
    [BillPropEnum.title]: string;
    [BillPropEnum.type]: string;
    [BillPropEnum.createDate]: Date;
    [BillPropEnum.updateDate]: Date;
    [BillPropEnum.latestAction]: ILatestAction;
    [BillPropEnum.url]: string;
}