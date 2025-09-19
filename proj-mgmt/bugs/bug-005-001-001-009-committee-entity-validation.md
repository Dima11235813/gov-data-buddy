Is there something wrong with our validation logic based on the data we're getting some validation errors logged to the console

Validation failed for committee hlqj00: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Select',
      name: 'Select Subcommittee to Investigate the Remaining Questions Surrounding January 6, 2021',
      parent: [Object],
      systemCode: 'hlqj00',
      updateDate: '2025-09-10T15:55:39Z',
      url: 'https://api.congress.gov/v3/committee/house/hlqj00?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Judiciary Committee',
      systemCode: 'hsju00',
      url: 'https://api.congress.gov/v3/committee/house/hsju00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee ssbk13: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'Senate',
      committeeTypeCode: 'Subcommittee',
      name: 'Digital Assets Subcommittee',
      parent: [Object],
      systemCode: 'ssbk13',
      updateDate: '2025-02-25T15:27:44Z',
      url: 'https://api.congress.gov/v3/committee/senate/ssbk13?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Banking, Housing, and Urban Affairs Committee',
      systemCode: 'ssbk00',
      url: 'https://api.congress.gov/v3/committee/senate/ssbk00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hlig11: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Subcommittee',
      name: 'Open Source Subcommittee',
      parent: [Object],
      systemCode: 'hlig11',
      updateDate: '2025-02-07T19:37:59Z',
      url: 'https://api.congress.gov/v3/committee/house/hlig11?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Intelligence (Permanent Select) Committee',
      systemCode: 'hlig00',
      url: 'https://api.congress.gov/v3/committee/house/hlig00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hsfa19: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Subcommittee',
      name: 'South and Central Asia  Subcommittee',
      parent: [Object],
      systemCode: 'hsfa19',
      updateDate: '2025-01-23T13:41:12Z',
      url: 'https://api.congress.gov/v3/committee/house/hsfa19?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Foreign Affairs Committee',
      systemCode: 'hsfa00',
      url: 'https://api.congress.gov/v3/committee/house/hsfa00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hsgo33: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Subcommittee',
      name: 'Federal Law Enforcement Subcommittee',
      parent: [Object],
      systemCode: 'hsgo33',
      updateDate: '2025-01-16T13:13:07Z',
      url: 'https://api.congress.gov/v3/committee/house/hsgo33?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Oversight and Government Reform Committee',
      systemCode: 'hsgo00',
      url: 'https://api.congress.gov/v3/committee/house/hsgo00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hsgo16: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Standing',
      name: 'Delivering on Government Efficiency Subcommittee',
      parent: [Object],
      systemCode: 'hsgo16',
      updateDate: '2025-01-16T12:41:04Z',
      url: 'https://api.congress.gov/v3/committee/house/hsgo16?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Oversight and Government Reform Committee',
      systemCode: 'hsgo00',
      url: 'https://api.congress.gov/v3/committee/house/hsgo00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hlfd00: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Select',
      name: 'Select Subcommittee on the Weaponization of the Federal Government',
      parent: [Object],
      systemCode: 'hlfd00',
      updateDate: '2025-01-04T11:54:09Z',
      url: 'https://api.congress.gov/v3/committee/house/hlfd00?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Judiciary Committee',
      systemCode: 'hsju00',
      url: 'https://api.congress.gov/v3/committee/house/hsju00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee hlvc00: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'House',
      committeeTypeCode: 'Subcommittee',
      name: 'Select Subcommittee on the Coronavirus Pandemic',
      parent: [Object],
      systemCode: 'hlvc00',
      updateDate: '2025-01-04T11:53:18Z',
      url: 'https://api.congress.gov/v3/committee/house/hlvc00?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Oversight and Government Reform Committee',
      systemCode: 'hsgo00',
      url: 'https://api.congress.gov/v3/committee/house/hsgo00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee ssju04: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'Senate',
      committeeTypeCode: 'Subcommittee',
      name: 'Immigration, Citizenship, and Border Safety Subcommittee',
      parent: [Object],
      systemCode: 'ssju04',
      updateDate: '2025-01-03T20:48:24Z',
      url: 'https://api.congress.gov/v3/committee/senate/ssju04?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Judiciary Committee',
      systemCode: 'ssju00',
      url: 'https://api.congress.gov/v3/committee/senate/ssju00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee sshr09: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'Senate',
      committeeTypeCode: 'Subcommittee',
      name: 'Children and Families Subcommittee',
      parent: [Object],
      systemCode: 'sshr09',
      updateDate: '2025-01-03T20:48:24Z',
      url: 'https://api.congress.gov/v3/committee/senate/sshr09?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Health, Education, Labor, and Pensions Committee',
      systemCode: 'sshr00',
      url: 'https://api.congress.gov/v3/committee/senate/sshr00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Validation failed for committee sshr12: [
  ValidationError {
    target: CommitteeEntity {
      chamber: 'Senate',
      committeeTypeCode: 'Subcommittee',
      name: 'Primary Health and Retirement Security Subcommittee',
      parent: [Object],
      systemCode: 'sshr12',
      updateDate: '2025-01-03T20:48:24Z',
      url: 'https://api.congress.gov/v3/committee/senate/sshr12?format=json',
      searchQuery: 'offset=0&limit=20&format=json'
    },
    value: {
      name: 'Health, Education, Labor, and Pensions Committee',
      systemCode: 'sshr00',
      url: 'https://api.congress.gov/v3/committee/senate/sshr00?format=json'
    },
    property: 'parent',
    children: [],
    constraints: { isString: 'parent must be a string' }
  }
]
Error in getCommittees: Error: Validation failed for committee hlqj00: [{"target":{"chamber":"House","committeeTypeCode":"Select","name":"Select Subcommittee to Investigate the Remaining Questions Surrounding January 6, 2021","parent":{"name":"Judiciary Committee","systemCode":"hsju00","url":"https://api.congress.gov/v3/committee/house/hsju00?format=json"},"systemCode":"hlqj00","updateDate":"2025-09-10T15:55:39Z","url":"https://api.congress.gov/v3/committee/house/hlqj00?format=json","searchQuery":"offset=0&limit=20&format=json"},"value":{"name":"Judiciary Committee","systemCode":"hsju00","url":"https://api.congress.gov/v3/committee/house/hsju00?format=json"},"property":"parent","children":[],"constraints":{"isString":"parent must be a string"}}]
    at C:\Dev\gov-data-buddy\backend\src\api\committee.api.ts:47:19
    at Generator.next (<anonymous>)
    at fulfilled (C:\Dev\gov-data-buddy\backend\src\api\committee.api.ts:5:58)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
