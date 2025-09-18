import { BillDto, BillPropEnum } from "@shared/Bill.model";
import { TimeUtils } from "src/app/shared/utils/time.utils";
import { StringHelper } from "../string.helpers";

export class BillDtoHelper {
    static billHasDateQuery(dto: BillDto): dto is BillDto & { [BillPropEnum.searchQuery]: string } {
        const query = dto[BillPropEnum.searchQuery] ?? null
        return !!dto && !!query && StringHelper.typeIsString(query)
    }
    static propContainsDateWithNotNeededData = (prop: BillPropEnum): boolean => {
        return prop === BillPropEnum.searchQuery
    }
    static propIsDate = (prop: BillPropEnum): boolean => {
        return prop === BillPropEnum.createDate || prop === BillPropEnum.updateDate
    }
    // First, decode the URL-encoded string and create a moment object
    static getTimeFromQuery = (bill: BillDto) => {
        if (!BillDtoHelper.billHasDateQuery(bill)) {
            return
        }
        const query = bill[BillPropEnum.searchQuery]
        const decoded = decodeURIComponent(query)
        const decodedQuery = decoded.split("=")
        if (!decodedQuery) {
            console.warn(`Issue with decoding date from query`)
            return
        }
        if (decodedQuery.length < 2) {
            console.warn(`Date query is malformed`)
            return
        }
        const time = decodedQuery[1]
        return TimeUtils.friendlyTimeAgoString(time)
    }
    static getTimeDisplayString = (dto: BillDto, prop: BillPropEnum): string => {
        const value = dto[prop]
        if (StringHelper.typeIsString(value)) {
            return TimeUtils.friendlyDateString(value)
        } else {
            return "Bad Date Format"
        }
    }
}