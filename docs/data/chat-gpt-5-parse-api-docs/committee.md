# Committee

committee
Returns committee data from the API


GET
/committee
Returns a list of congressional committees.

GET /committee

Example Request

https://api.congress.gov/v3/committee?api_key=[INSERT_KEY]

Example Response

{
     "committees": [
        {
            "chamber": "House",
            "committeeTypeCode": "Standing",
            "updateDate": "2020-02-04T00:07:37Z"
            "name": "Transportation and Infrastructure Committee",
            "parent": null,
            "subcommittees": [
                {
                    "name": "Investigations and Oversight Subcommittee",
                    "systemCode": "hspw01",
                    "url": "https://api.congress.gov/v3/committee/house/hspw01?format=json"
                },
                {
                    "name": "Public Buildings and Grounds Subcommittee",
                    "systemCode": "hspw04",
                    "url": "https://api.congress.gov/v3/committee/house/hspw04?format=json"
                },
                {
                    "name": "Economic Development Subcommittee",
                    "systemCode": "hspw06",
                    "url": "https://api.congress.gov/v3/committee/house/hspw06?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, Hazardous Materials and Pipeline Transportation Subcommittee",
                    "systemCode": "hspw08",
                    "url": "https://api.congress.gov/v3/committee/house/hspw08?format=json"
                },
                {
                    "name": "Railroads Subcommittee",
                    "systemCode": "hspw09",
                    "url": "https://api.congress.gov/v3/committee/house/hspw09?format=json"
                },
                {
                    "name": "Ground Transportation Subcommittee",
                    "systemCode": "hspw10",
                    "url": "https://api.congress.gov/v3/committee/house/hspw10?format=json"
                },
                {
                    "name": "Aviation Subcommittee",
                    "systemCode": "hspw05",
                    "url": "https://api.congress.gov/v3/committee/house/hspw05?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, and Emergency Management Subcommittee",
                    "systemCode": "hspw13",
                    "url": "https://api.congress.gov/v3/committee/house/hspw13?format=json"
                },
                {
                    "name": "Highways and Transit Subcommittee",
                    "systemCode": "hspw12",
                    "url": "https://api.congress.gov/v3/committee/house/hspw12?format=json"
                },
                {
                    "name": "Railroads, Pipelines, and Hazardous Materials Subcommittee",
                    "systemCode": "hspw14",
                    "url": "https://api.congress.gov/v3/committee/house/hspw14?format=json"
                },
                {
                    "name": "Water Resources and Environment Subcommittee",
                    "systemCode": "hspw02",
                    "url": "https://api.congress.gov/v3/committee/house/hspw02?format=json"
                },
                {
                    "name": "Public-Private Partnerships Subcommittee",
                    "systemCode": "hspw33",
                    "url": "https://api.congress.gov/v3/committee/house/hspw33?format=json"
                },
                {
                    "name": "Surface Transportation Subcommittee",
                    "systemCode": "hspw03",
                    "url": "https://api.congress.gov/v3/committee/house/hspw03?format=json"
                },
                {
                    "name": "Oversight, Investigations and Emergency Management Subcommittee",
                    "systemCode": "hspw11",
                    "url": "https://api.congress.gov/v3/committee/house/hspw11?format=json"
                },
                {
                    "name": "Coast Guard and Maritime Transportation Subcommittee",
                    "systemCode": "hspw07",
                    "url": "https://api.congress.gov/v3/committee/house/hspw07?format=json"
                }
            ],
            "systemCode": "hspw00",
            "url": "https://api.congress.gov/v3/committee/house/hspw00?format=json"
        },
     ]
}
Parameters
Try it out
Name	Description
format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}
Returns a list of congressional committees filtered by the specified chamber.

GET /committee/:chamber

Example Request

https://api.congress.gov/v3/committee/house?api_key=[INSERT_KEY]

Example Response

{
     "committees": [
        {
            "chamber": "House",
            "committeeTypeCode": "Standing",
            "name": "Transportation and Infrastructure Committee",
            "parent": null,
            "subcommittees": [
                {
                    "name": "Investigations and Oversight Subcommittee",
                    "systemCode": "hspw01",
                    "url": "https://api.congress.gov/v3/committee/house/hspw01?format=json"
                },
                {
                    "name": "Public Buildings and Grounds Subcommittee",
                    "systemCode": "hspw04",
                    "url": "https://api.congress.gov/v3/committee/house/hspw04?format=json"
                },
                {
                    "name": "Economic Development Subcommittee",
                    "systemCode": "hspw06",
                    "url": "https://api.congress.gov/v3/committee/house/hspw06?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, Hazardous Materials and Pipeline Transportation Subcommittee",
                    "systemCode": "hspw08",
                    "url": "https://api.congress.gov/v3/committee/house/hspw08?format=json"
                },
                {
                    "name": "Railroads Subcommittee",
                    "systemCode": "hspw09",
                    "url": "https://api.congress.gov/v3/committee/house/hspw09?format=json"
                },
                {
                    "name": "Ground Transportation Subcommittee",
                    "systemCode": "hspw10",
                    "url": "https://api.congress.gov/v3/committee/house/hspw10?format=json"
                },
                {
                    "name": "Aviation Subcommittee",
                    "systemCode": "hspw05",
                    "url": "https://api.congress.gov/v3/committee/house/hspw05?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, and Emergency Management Subcommittee",
                    "systemCode": "hspw13",
                    "url": "https://api.congress.gov/v3/committee/house/hspw13?format=json"
                },
                {
                    "name": "Highways and Transit Subcommittee",
                    "systemCode": "hspw12",
                    "url": "https://api.congress.gov/v3/committee/house/hspw12?format=json"
                },
                {
                    "name": "Railroads, Pipelines, and Hazardous Materials Subcommittee",
                    "systemCode": "hspw14",
                    "url": "https://api.congress.gov/v3/committee/house/hspw14?format=json"
                },
                {
                    "name": "Water Resources and Environment Subcommittee",
                    "systemCode": "hspw02",
                    "url": "https://api.congress.gov/v3/committee/house/hspw02?format=json"
                },
                {
                    "name": "Public-Private Partnerships Subcommittee",
                    "systemCode": "hspw33",
                    "url": "https://api.congress.gov/v3/committee/house/hspw33?format=json"
                },
                {
                    "name": "Surface Transportation Subcommittee",
                    "systemCode": "hspw03",
                    "url": "https://api.congress.gov/v3/committee/house/hspw03?format=json"
                },
                {
                    "name": "Oversight, Investigations and Emergency Management Subcommittee",
                    "systemCode": "hspw11",
                    "url": "https://api.congress.gov/v3/committee/house/hspw11?format=json"
                },
                {
                    "name": "Coast Guard and Maritime Transportation Subcommittee",
                    "systemCode": "hspw07",
                    "url": "https://api.congress.gov/v3/committee/house/hspw07?format=json"
                }
            ],
            "systemCode": "hspw00",
            "url": "https://api.congress.gov/v3/committee/house/hspw00?format=json"
        },
     ]
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value can be house, senate, or joint.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{congress}
Returns a list of congressional committees filtered by the specified congress.

GET /committee/:congress

Example Request

https://api.congress.gov/v3/committee/117?api_key=[INSERT_KEY]

Example Response

{
     "committees": [
        {
            "chamber": "House",
            "committeeTypeCode": "Standing",
            "name": "Transportation and Infrastructure Committee",
            "parent": null,
            "subcommittees": [
                {
                    "name": "Investigations and Oversight Subcommittee",
                    "systemCode": "hspw01",
                    "url": "https://api.congress.gov/v3/committee/house/hspw01?format=json"
                },
                {
                    "name": "Public Buildings and Grounds Subcommittee",
                    "systemCode": "hspw04",
                    "url": "https://api.congress.gov/v3/committee/house/hspw04?format=json"
                },
                {
                    "name": "Economic Development Subcommittee",
                    "systemCode": "hspw06",
                    "url": "https://api.congress.gov/v3/committee/house/hspw06?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, Hazardous Materials and Pipeline Transportation Subcommittee",
                    "systemCode": "hspw08",
                    "url": "https://api.congress.gov/v3/committee/house/hspw08?format=json"
                },
                {
                    "name": "Railroads Subcommittee",
                    "systemCode": "hspw09",
                    "url": "https://api.congress.gov/v3/committee/house/hspw09?format=json"
                },
                {
                    "name": "Ground Transportation Subcommittee",
                    "systemCode": "hspw10",
                    "url": "https://api.congress.gov/v3/committee/house/hspw10?format=json"
                },
                {
                    "name": "Aviation Subcommittee",
                    "systemCode": "hspw05",
                    "url": "https://api.congress.gov/v3/committee/house/hspw05?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, and Emergency Management Subcommittee",
                    "systemCode": "hspw13",
                    "url": "https://api.congress.gov/v3/committee/house/hspw13?format=json"
                },
                {
                    "name": "Highways and Transit Subcommittee",
                    "systemCode": "hspw12",
                    "url": "https://api.congress.gov/v3/committee/house/hspw12?format=json"
                },
                {
                    "name": "Railroads, Pipelines, and Hazardous Materials Subcommittee",
                    "systemCode": "hspw14",
                    "url": "https://api.congress.gov/v3/committee/house/hspw14?format=json"
                },
                {
                    "name": "Water Resources and Environment Subcommittee",
                    "systemCode": "hspw02",
                    "url": "https://api.congress.gov/v3/committee/house/hspw02?format=json"
                },
                {
                    "name": "Public-Private Partnerships Subcommittee",
                    "systemCode": "hspw33",
                    "url": "https://api.congress.gov/v3/committee/house/hspw33?format=json"
                },
                {
                    "name": "Surface Transportation Subcommittee",
                    "systemCode": "hspw03",
                    "url": "https://api.congress.gov/v3/committee/house/hspw03?format=json"
                },
                {
                    "name": "Oversight, Investigations and Emergency Management Subcommittee",
                    "systemCode": "hspw11",
                    "url": "https://api.congress.gov/v3/committee/house/hspw11?format=json"
                },
                {
                    "name": "Coast Guard and Maritime Transportation Subcommittee",
                    "systemCode": "hspw07",
                    "url": "https://api.congress.gov/v3/committee/house/hspw07?format=json"
                }
            ],
            "systemCode": "hspw00",
            "url": "https://api.congress.gov/v3/committee/house/hspw00?format=json"
        },
     ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{congress}/{chamber}
Returns a list of committees filtered by the specified congress and chamber.

GET /committee/:congress/:chamber

Example Request

https://api.congress.gov/v3/committee/117/house?api_key=[INSERT_KEY]

Example Response

{
     "committees": [
        {
            "chamber": "House",
            "committeeTypeCode": "Standing",
            "name": "Transportation and Infrastructure Committee",
            "parent": null,
            "subcommittees": [
                {
                    "name": "Investigations and Oversight Subcommittee",
                    "systemCode": "hspw01",
                    "url": "https://api.congress.gov/v3/committee/house/hspw01?format=json"
                },
                {
                    "name": "Public Buildings and Grounds Subcommittee",
                    "systemCode": "hspw04",
                    "url": "https://api.congress.gov/v3/committee/house/hspw04?format=json"
                },
                {
                    "name": "Economic Development Subcommittee",
                    "systemCode": "hspw06",
                    "url": "https://api.congress.gov/v3/committee/house/hspw06?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, Hazardous Materials and Pipeline Transportation Subcommittee",
                    "systemCode": "hspw08",
                    "url": "https://api.congress.gov/v3/committee/house/hspw08?format=json"
                },
                {
                    "name": "Railroads Subcommittee",
                    "systemCode": "hspw09",
                    "url": "https://api.congress.gov/v3/committee/house/hspw09?format=json"
                },
                {
                    "name": "Ground Transportation Subcommittee",
                    "systemCode": "hspw10",
                    "url": "https://api.congress.gov/v3/committee/house/hspw10?format=json"
                },
                {
                    "name": "Aviation Subcommittee",
                    "systemCode": "hspw05",
                    "url": "https://api.congress.gov/v3/committee/house/hspw05?format=json"
                },
                {
                    "name": "Economic Development, Public Buildings, and Emergency Management Subcommittee",
                    "systemCode": "hspw13",
                    "url": "https://api.congress.gov/v3/committee/house/hspw13?format=json"
                },
                {
                    "name": "Highways and Transit Subcommittee",
                    "systemCode": "hspw12",
                    "url": "https://api.congress.gov/v3/committee/house/hspw12?format=json"
                },
                {
                    "name": "Railroads, Pipelines, and Hazardous Materials Subcommittee",
                    "systemCode": "hspw14",
                    "url": "https://api.congress.gov/v3/committee/house/hspw14?format=json"
                },
                {
                    "name": "Water Resources and Environment Subcommittee",
                    "systemCode": "hspw02",
                    "url": "https://api.congress.gov/v3/committee/house/hspw02?format=json"
                },
                {
                    "name": "Public-Private Partnerships Subcommittee",
                    "systemCode": "hspw33",
                    "url": "https://api.congress.gov/v3/committee/house/hspw33?format=json"
                },
                {
                    "name": "Surface Transportation Subcommittee",
                    "systemCode": "hspw03",
                    "url": "https://api.congress.gov/v3/committee/house/hspw03?format=json"
                },
                {
                    "name": "Oversight, Investigations and Emergency Management Subcommittee",
                    "systemCode": "hspw11",
                    "url": "https://api.congress.gov/v3/committee/house/hspw11?format=json"
                },
                {
                    "name": "Coast Guard and Maritime Transportation Subcommittee",
                    "systemCode": "hspw07",
                    "url": "https://api.congress.gov/v3/committee/house/hspw07?format=json"
                }
            ],
            "systemCode": "hspw00",
            "url": "https://api.congress.gov/v3/committee/house/hspw00?format=json"
        },
     ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

chamber *
string
(path)
The chamber name. Value can be house, senate, or joint.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}
Returns detailed information for a specified congressional committee.

GET /committee/:chamber/:committeeCode

Example Request

https://api.congress.gov/v3/committee/house/hspw00?api_key=[INSERT_KEY]

Example Response

{
    "committee": {
        "bills": {
            "count": 25384,
            "url": "https://api.congress.gov/v3/committee/house/hspw00/bills?format=json"
        },
        "communications": {
            "count": 6775,
            "url": "https://api.congress.gov/v3/committee/house/hspw00/house-communication?format=json"
        },
        "history": [
            {
                "libraryOfCongressName": "Transportation and Infrastructure",
                "officialName": "Committee on Transportation and Infrastructure",
                "startDate": "1995-01-04T05:00:00Z",
                "updateDate": "2020-02-14T19:13:07Z"
            },
            {
                "endDate": "1995-01-03T05:00:00Z",
                "libraryOfCongressName": "Public Works and Transportation",
                "officialName": "Committee on Public Works and Transportation",
                "startDate": "1975-01-01T05:00:00Z",
                "updateDate": "2020-02-10T16:49:05Z"
            },
            {
                "endDate": "1974-12-31T05:00:00Z",
                "libraryOfCongressName": "Public Works",
                "officialName": "Committee on Public Works",
                "startDate": "1946-08-02T04:00:00Z",
                "updateDate": "2020-02-10T16:49:05Z"
            }
        ],
        "isCurrent": true,
        "reports": {
            "count": 1382,
            "url": "https://api.congress.gov/v3/committee/house/hspw00/reports?format=json"
        },
        "subcommittees": [
            {
                "name": "Investigations and Oversight Subcommittee",
                "systemCode": "hspw01",
                "url": "https://api.congress.gov/v3/committee/house/hspw01?format=json"
            },
            {
                "name": "Public Buildings and Grounds Subcommittee",
                "systemCode": "hspw04",
                "url": "https://api.congress.gov/v3/committee/house/hspw04?format=json"
            },
            {
                "name": "Economic Development Subcommittee",
                "systemCode": "hspw06",
                "url": "https://api.congress.gov/v3/committee/house/hspw06?format=json"
            },
            {
                "name": "Economic Development, Public Buildings, Hazardous Materials and Pipeline Transportation Subcommittee",
                "systemCode": "hspw08",
                "url": "https://api.congress.gov/v3/committee/house/hspw08?format=json"
            },
            {
                "name": "Railroads Subcommittee",
                "systemCode": "hspw09",
                "url": "https://api.congress.gov/v3/committee/house/hspw09?format=json"
            },
            {
                "name": "Ground Transportation Subcommittee",
                "systemCode": "hspw10",
                "url": "https://api.congress.gov/v3/committee/house/hspw10?format=json"
            },
            {
                "name": "Aviation Subcommittee",
                "systemCode": "hspw05",
                "url": "https://api.congress.gov/v3/committee/house/hspw05?format=json"
            },
            {
                "name": "Economic Development, Public Buildings, and Emergency Management Subcommittee",
                "systemCode": "hspw13",
                "url": "https://api.congress.gov/v3/committee/house/hspw13?format=json"
            },
            {
                "name": "Highways and Transit Subcommittee",
                "systemCode": "hspw12",
                "url": "https://api.congress.gov/v3/committee/house/hspw12?format=json"
            },
            {
                "name": "Railroads, Pipelines, and Hazardous Materials Subcommittee",
                "systemCode": "hspw14",
                "url": "https://api.congress.gov/v3/committee/house/hspw14?format=json"
            },
            {
                "name": "Water Resources and Environment Subcommittee",
                "systemCode": "hspw02",
                "url": "https://api.congress.gov/v3/committee/house/hspw02?format=json"
            },
            {
                "name": "Public-Private Partnerships Subcommittee",
                "systemCode": "hspw33",
                "url": "https://api.congress.gov/v3/committee/house/hspw33?format=json"
            },
            {
                "name": "Surface Transportation Subcommittee",
                "systemCode": "hspw03",
                "url": "https://api.congress.gov/v3/committee/house/hspw03?format=json"
            },
            {
                "name": "Oversight, Investigations and Emergency Management Subcommittee",
                "systemCode": "hspw11",
                "url": "https://api.congress.gov/v3/committee/house/hspw11?format=json"
            },
            {
                "name": "Coast Guard and Maritime Transportation Subcommittee",
                "systemCode": "hspw07",
                "url": "https://api.congress.gov/v3/committee/house/hspw07?format=json"
            }
        ],
        "systemCode": "hspw00",
        "type": "Standing",
        "updateDate": "2020-02-04T00:07:37Z"
    },
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value can be house, senate, or joint.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be hspw00.

format
string
(query)
The data format. Value can be xml or json.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}/bills
Returns the list of legislation associated with the specified congressional committee.

GET /committee/:chamber/:committeeCode/bills

Example Request

https://api.congress.gov/v3/committee/house/hspw00/bills?api_key=[INSERT_KEY]

Example Response

{
    "committee-bills": {
        "bills": [
            {
                "actionDate": "2012-04-19T13:01:00Z",
                "congress": 112,
                "number": "117",
                "relationshipType": "Referred to",
                "type": "HCONRES",
                "updateDate": "2019-02-17T21:10:13Z",
                "url": "https://api.congress.gov/v3/bill/112/hconres/117?format=json"
            },
            {
                "actionDate": "2012-02-08T14:51:00Z",
                "congress": 112,
                "number": "543",
                "relationshipType": "Referred to",
                "type": "HRES",
                "updateDate": "2019-02-17T21:05:25Z",
                "url": "https://api.congress.gov/v3/bill/112/hres/543?format=json"
            },
        ],
    },
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value can be house, senate, or joint.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be hspw00.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}/reports
Returns the list of committee reports associated with a specified congressional committee.

GET /committee/:chamber/:committeeCode/reports

Example Request

https://api.congress.gov/v3/committee/house/hspw00/reports?api_key=[INSERT_KEY]

Example Response

{
    "reports": [
        {
            "chamber": "House",
            "citation": "H. Rept. 109-570",
            "congress": 109,
            "number": 570,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2015-03-20 00:04:12+00:00",
            "url": "https://api.congress.gov/v3/committee-report/109/HRPT/570?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 109-121",
            "congress": 109,
            "number": 121,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2015-03-20 00:06:53+00:00",
            "url": "https://api.congress.gov/v3/committee-report/109/HRPT/121?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value can be house, senate, or joint.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be hspw00.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

fromDateTime
string
(query)
The starting timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by update date. Use format: YYYY-MM-DDT00:00:00Z.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}/nominations
Returns the list of nominations associated with a specified congressional committee.

GET /committee/senate/:committeeCode/nominations

Example Request

https://api.congress.gov/v3/committee/senate/ssas00/nominations?format=json&api_key=[INSERT_KEY]

Example Response

{
    "nominations": [
        {
            "citation": "PN2477",
            "congress": 117,
            "description": " ",
            "latestAction": {
                "actionDate": "2022-09-29",
                "text": "Confirmed by the Senate by Voice Vote."
            },
            "nominationType": {
                "isCivilian": false,
                "isMilitary": true
            },
            "number": 2477,
            "partNumber": "00",
            "receivedDate": "2022-08-03",
            "updateDate": "2022-09-30 04:40:14+00:00",
            "url": "https://api.congress.gov/v3/nomination/117/2477?format=json"
        },
        {
            "citation": "PN2486",
            "congress": 117,
            "description": " ",
            "latestAction": {
                "actionDate": "2022-09-29",
                "text": "Confirmed by the Senate by Voice Vote."
            },
            "nominationType": {
                "isCivilian": false,
                "isMilitary": true
            },
            "number": 2486,
            "partNumber": "00",
            "receivedDate": "2022-08-03",
            "updateDate": "2022-09-30 04:40:15+00:00",
            "url": "https://api.congress.gov/v3/nomination/117/2486?format=json"
        },
    ],
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value will be senate.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be ssas00.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}/house-communication
Returns the list of House communications associated with a specified congressional committee.

GET /committee/:chamber/:committeeCode/house-communication

Example Request

https://api.congress.gov/v3/committee/house/hspw00/house-communication?api_key=[INSERT_KEY]

Example Response

{
  "houseCommunications": [
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 114,
            "number": 3262,
            "referralDate": "2015-10-27",
            "updateDate": "2018-02-02",
            "url": "https://api.congress.gov/v3/house-communication/114/ec/3262?format=json"
        },
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 115,
            "number": 3263,
            "referralDate": "2015-10-27",
            "updateDate": "2018-02-02",
            "url": "https://api.congress.gov/v3/house-communication/114/ec/3263?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value will be house.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be hspw00.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/committee/{chamber}/{committeeCode}/senate-communication
Returns the list of Senate communications associated with a specified congressional committee.

GET /committee/:chamber/:committeeCode/senate-communication

Example Request

https://api.congress.gov/v3/committee/senate/ssas00/senate-communication?api_key=[INSERT_KEY]

Example Response

{
  "senateCommunications": [
        {
            "chamber": "Senate",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 114,
            "number": 7402,
            "referralDate": "2016-11-16",
            "updateDate": "2017-01-06",
            "url": "https://api.congress.gov/v3/senate-communication/114/ec/7402?format=json"
        },
        {
            "chamber": "Senate",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 114,
            "number": 7403,
            "referralDate": "2016-11-16",
            "updateDate": "2017-01-06",
            "url": "https://api.congress.gov/v3/senate-communication/114/ec/7403?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
chamber *
string
(path)
The chamber name. Value will be senate.

committeeCode *
string
(path)
The committee code for the committee. For example, the value can be ssas00.

format
string
(query)
The data format. Value can be xml or json.

offset
integer
(query)
The starting record returned. 0 is the first record.

limit
integer
(query)
The number of records returned. The maximum limit is 250.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value