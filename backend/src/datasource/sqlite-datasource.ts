import { DataSource } from "typeorm";
import { BillEntity } from "../entity/BillEntity";
import { LatestActionEntity } from "../entity/LatestActionEntity";
import { Member as MemberEntity } from "../entity/MemberEntity";
import { Served as ServedEntity } from "../entity/ServedEntity";
import { Depiction as DepictionEntity } from "../entity/DepictionEntity";
import { Term as TermEntity } from "../entity/TermEntity";
import { MemberPicture } from "../entity/MemberPictureEntity";
import { CountAndUrlEntity } from "../entity/CountAndUrlEntity";
import { ActionEntity } from "../entity/ActionEntity";
import { BillDetailsEntity } from "../entity/BillDetailsEntity";
import { PolicyAreaEntity } from "../entity/PolicyAreaEntity";
import { RequestEntity } from "../entity/RequestEntity";
import { SponsorEntity } from "../entity/SponsorEntity";
import { CBOCostEstimateEntity } from "../entity/CboCostEstimateEntity";
import { CommitteeReport } from "../entity/CommitteeReportEntity";
import { CommitteeEntity } from "../entity/CommitteeEntity";
import { GovApiQuery } from "../entity/GovApiQuery";

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  logging: false,
  entities: [
    // BILLS
    BillEntity,
    LatestActionEntity,
    //BILL DETAILS
    BillDetailsEntity,
    CBOCostEstimateEntity,
    CommitteeReport,
    ActionEntity,
    PolicyAreaEntity,
    SponsorEntity,
    RequestEntity,
    CountAndUrlEntity,
    // MEMBER
    MemberEntity,
    ServedEntity,
    DepictionEntity,
    TermEntity,
    MemberPicture,
    // QUERIES
    GovApiQuery, // Temporarily disabled due to TypeScript decorator issues
    // COMMITTEE
    CommitteeEntity
  ],
});