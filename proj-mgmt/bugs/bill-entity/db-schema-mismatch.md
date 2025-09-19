Error saving bill 119-HR-3692: QueryFailedError: SQLITE_CONSTRAINT: UNIQUE constraint failed: bill_details_entity.committees
    at Statement.handler (C:\Dev\gov-data-buddy\backend\node_modules\typeorm\src\driver\sqlite\SqliteQueryRunner.ts:133:29) {
  query: 'INSERT INTO "bill_details_entity"("id", "actions", "amendments", "committees", "congress", "introducedDate", "latestAction", "number", "originChamber", "originChamberCode", "laws", "legislationUrl", "cosponsors", "title", "titles", "type", "updateDate", "updateDateIncludingText", "policyArea", "relatedBills", "sponsors", "subjects", "summaries", "textVersions") VALUES (NULL, ?, NULL, ?, 119, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, ?, NULL, ?)',
  parameters: [
    '{"count":7,"url":"https://api.congress.gov/v3/bill/119/hr/3692/actions?format=json"}',
    '{"count":1,"url":"https://api.congress.gov/v3/bill/119/hr/3692/committees?format=json"}',
    '2025-06-03',
    '{"actionDate":"2025-09-17","text":"Ordered to be Reported by Unanimous Consent."}',
    '3692',
    'House',
    'H',
    'https://www.congress.gov/bill/119th-congress/house-bill/3692',
    '{"count":7,"countIncludingWithdrawnCosponsors":7,"url":"https://api.congress.gov/v3/bill/119/hr/3692/cosponsors?format=json"}',
    "To reauthorize the Young Fishermen's Development Act.",
    '{"count":2,"url":"https://api.congress.gov/v3/bill/119/hr/3692/titles?format=json"}',
    'HR',
    '2025-09-18T08:06:30Z',
    '2025-09-18T08:06:30Z',
    '{"name":"Public Lands and Natural Resources"}',
    '[{"bioguideId":"M001196","district":6,"firstName":"Seth","fullName":"Rep. Moulton, Seth [D-MA-6]","isByRequest":"N","lastName":"Moulton","party":"D","state":"MA","url":"https://api.congress.gov/v3/member/M001196?format=json"}]',
    '{"count":4,"url":"https://api.congress.gov/v3/bill/119/hr/3692/subjects?format=json"}',
    '{"count":1,"url":"https://api.congress.gov/v3/bill/119/hr/3692/text?format=json"}'
  ],
  driverError: [Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: bill_details_entity.committees] {
    errno: 19,
    code: 'SQLITE_CONSTRAINT'
  },
  errno: 19,
  code: 'SQLITE_CONSTRAINT'
}
Error in getBillDetails: Error: Failed to save bill details for 119-HR-3692
    at C:\Dev\gov-data-buddy\backend\src\api\bill.api.ts:234:15
    at Generator.throw (<anonymous>)
    at rejected (C:\Dev\gov-data-buddy\backend\src\api\bill.api.ts:39:65)
