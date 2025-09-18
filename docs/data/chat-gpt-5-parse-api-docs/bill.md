# Bill

bill
Returns bill data from the API


GET
/bill
Returns a list of bills sorted by date of latest action.

GET /bill

Example Request

https://api.congress.gov/v3/bill?api_key=[INSERT_KEY]

Example Response

{
    "bills": [
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Became Public Law No: 117-108."
            },
            "number": "3076",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Postal Service Reform Act of 2022",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29T03:27:05Z",
            "url": "https://api.congress.gov/v3/bill/117/hr/3076?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Read twice. Placed on Senate Legislative Calendar under General Orders. Calendar No. 343."
            },
            "number": "3599",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Federal Rotational Cyber Workforce Program Act of 2021",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29",
            "url": "https://api.congress.gov/v3/bill/117/hr/3599?format=json"
        },
    ],
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

sort
string
(query)
Sort by update date in Congress.gov. Value can be updateDate+asc or updateDate+desc.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bill/{congress}
Returns a list of bills filtered by the specified congress, sorted by date of latest action.

GET /bill/:congress

Example Request

https://api.congress.gov/v3/bill/117?fromDateTime=2022-08-04T04:02:00Z&toDateTime=2022-09-30T04:03:00Z&sort=updateDate+desc&api_key=[INSERT_KEY]

Example Response

{
    "bills": [
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Became Public Law No: 117-108."
            },
            "number": "3076",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Postal Service Reform Act of 2022",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29",
            "url": "https://api.congress.gov/v3/bill/117/hr/3076?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Read twice. Placed on Senate Legislative Calendar under General Orders. Calendar No. 343."
            },
            "number": "3599",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Federal Rotational Cyber Workforce Program Act of 2021",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29",
            "url": "https://api.congress.gov/v3/bill/117/hr/3599?format=json"
        },
    ],
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

sort
string
(query)
Sort by update date in Congress.gov. Value can be updateDate+asc or updateDate+desc.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bill/{congress}/{billType}
Returns a list of bills filtered by the specified congress and bill type, sorted by date of latest action.

GET /bill/:congress/:billType

Example Request

https://api.congress.gov/v3/bill/117/hr?fromDateTime=2022-08-04T04:02:00Z&toDateTime=2022-09-30T04:03:00Z&sort=updateDate+asc&api_key=[INSERT_KEY]

Example Response

{
    "bills": [
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Became Public Law No: 117-108."
            },
            "number": "3076",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Postal Service Reform Act of 2022",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29",
            "url": "https://api.congress.gov/v3/bill/117/hr/3076?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-04-06",
                "text": "Read twice. Placed on Senate Legislative Calendar under General Orders. Calendar No. 343."
            },
            "number": "3599",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Federal Rotational Cyber Workforce Program Act of 2021",
            "type": "HR",
            "updateDate": "2022-09-29",
            "updateDateIncludingText": "2022-09-29T03:41:50Z",
            "url": "https://api.congress.gov/v3/bill/117/hr/3599?format=json"
        },
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

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

sort
string
(query)
Sort by update date in Congress.gov. Value can be updateDate+asc or updateDate+desc.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bill/{congress}/{billType}/{billNumber}
Returns detailed information for a specified bill.

GET /bill/:congress/:billType/:billNumber

Example Request

https://api.congress.gov/v3/bill/117/hr/3076?api_key=[INSERT_KEY]

Example Response

{
    "bill": {
        "actions": {
            "count": 74,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/actions?format=json"
        },
        "amendments": {
            "count": 48,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/amendments?format=json"
        },
        "cboCostEstimates": [
            {
                "description": "As ordered reported by the House Committee on Oversight and Reform on May 13, 2021\n",
                "pubDate": "2021-07-14T17:27:00Z",
                "title": "H.R. 3076, Postal Service Reform Act of 2021",
                "url": "https://www.cbo.gov/publication/57356"
            },
            {
                "description": "As Posted on February 3, 2022,\nand as Amended by Amendment #1, the Manager's Amendment, as Posted on February 4, 2022\n",
                "pubDate": "2022-02-04T18:03:00Z",
                "title": "Estimated Budgetary Effects of Rules Committee Print 117-32 for H.R. 3076, the Postal Service Reform Act of 2022",
                "url": "https://www.cbo.gov/publication/57821"
            }
        ],
        "committeeReports": [
            {
                "citation": "H. Rept. 117-89,Part 1",
                "url": "https://api.congress.gov/v3/committee-report/117/HRPT/89?format=json"
            },
            {
                "citation": "H. Rept. 117-89,Part 2",
                "url": "https://api.congress.gov/v3/committee-report/117/HRPT/89?format=json"
            }
        ],
        "committees": {
            "count": 3,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/committees?format=json"
        },
        "congress": 117,
        "constitutionalAuthorityStatementText": "<pre>\n[Congressional Record Volume 167, Number 81 (Tuesday, May 11, 2021)]\n[House]\nFrom the Congressional Record Online through the Government Publishing Office [<a href="\&quot;https://www.gpo.gov\&quot;">www.gpo.gov</a>]\nBy Mrs. CAROLYN B. MALONEY of New York:\nH.R. 3076.\nCongress has the power to enact this legislation pursuant\nto the following:\nArticle I, Section I, Clause 18 (Necessary and Proper\nClause)\n[Page H2195]\n</pre>",
        "cosponsors": {
            "count": 102,
            "countIncludingWithdrawnCosponsors": 102,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/cosponsors?format=json"
        },
        "introducedDate": "2021-05-11",
        "latestAction": {
            "actionDate": "2022-04-06",
            "text": "Became Public Law No: 117-108."
        },
        "laws": [
            {
                "number": "117-108",
                "type": "Public Law"
            }
        ],
        "legislationUrl": "https://congress.gov/bill/117th-congress/house-bill/3076",
        "number": "3076",
        "originChamber": "House",
        "policyArea": {
            "name": "Government Operations and Politics"
        },
        "relatedBills": {
            "count": 4,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/relatedbills?format=json"
        },
        "sponsors": [
            {
                "bioguideId": "M000087",
                "district": 12,
                "firstName": "CAROLYN",
                "fullName": "Rep. Maloney, Carolyn B. [D-NY-12]",
                "isByRequest": "N",
                "lastName": "MALONEY",
                "middleName": "B.",
                "party": "D",
                "state": "NY",
                "url": "https://api.congress.gov/v3/member/M000087?format=json"
            }
        ],
        "subjects": {
            "count": 17,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/subjects?format=json"
        },
        "summaries": {
            "count": 5,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/summaries?format=json"
        },
        "textVersions": {
            "count": 8,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/text?format=json"
        },
        "title": "Postal Service Reform Act of 2022",
        "titles": {
            "count": 14,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/titles?format=json"
        },
        "type": "HR",
        "updateDate": "2022-09-29T03:27:05Z",
        "updateDateIncludingText": "2022-09-29T03:27:05Z"
    },
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/actions
Returns the list of actions on a specified bill.

GET /bill/:congress/:billType/:billNumber/actions

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/actions?api_key=[INSERT_KEY]

Example Request

{
    "actions": [
        {
            "actionCode": "36000",
            "actionDate": "2022-04-06",
            "sourceSystem": {
                "code": 9,
                "name": "Library of Congress"
            },
            "text": "Became Public Law No: 117-108.",
            "type": "BecameLaw"
        },
        {
            "actionCode": "E30000",
            "actionDate": "2022-04-06",
            "sourceSystem": {
                "code": 9,
                "name": "Library of Congress"
            },
            "text": "Signed by President.",
            "type": "President"
        },
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/amendments
Returns the list of amendments to a specified bill.

GET /bill/:congress/:billType/:billNumber/amendments

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/amendments?api_key=[INSERT_KEY]

Example Response

{
    "amendments": [
        {
            "congress": 117,
            "description": "An amendment numbered 1 printed in House Report 117-243 to clarifiy the roles and responsibilities of the Office of Personnel Management, the Social Security Administration, and the Centers for Medicare &amp; Medicaid Services regarding the information postal employees will need to enroll in Medicare Part B; specify that performance standards must be submitted to the Postal Regulatory Commission for each product; and make other technical and conforming changes to the bill.",
            "latestAction": {
                "actionDate": "2022-02-08",
                "actionTime": "15:39:53",
                "text": "On agreeing to the Maloney, Carolyn B. amendment (A002) Agreed to by voice vote. "
            },
            "number": "173",
            "type": "HAMDT",
            "updateDate": "2022-02-18T16:38:41Z",
            "url": "https://api.congress.gov/v3/amendment/117/hamdt/173?format=json"
        },
        {
            "congress": 117,
            "description": "Pursuant to the provisions of H. Res. 912, the amendment in the nature of a substitute consisting of the text of Rules Committee Print 117-32 is considered as adopted.",
            "latestAction": {
                "actionDate": "2022-02-08",
                "text": "On agreeing to the Rules amendment (A001) Agreed to without objection. "
            },
            "number": "172",
            "type": "HAMDT",
            "updateDate": "2022-02-18T16:38:41Z",
            "url": "https://api.congress.gov/v3/amendment/117/hamdt/172?format=json"
        }
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/committees
Returns the list of committees associated with a specified bill.

GET /bill/:congress/:billType/:billNumber/committees

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/committees?api_key=[INSERT_KEY]

Example Response

{
  "committees": [
        {
            "activities": [
                {
                    "date": "2021-07-21T19:51:51Z",
                    "name": "Reported by"
                },
                {
                    "date": "2021-07-16T13:49:15Z",
                    "name": "Reported by"
                },
                {
                    "date": "2021-05-13T18:36:37Z",
                    "name": "Markup by"
                },
                {
                    "date": "2021-05-11T18:05:40Z",
                    "name": "Referred to"
                }
            ],
            "chamber": "House",
            "name": "Oversight and Reform Committee",
            "systemCode": "hsgo00",
            "type": "Standing",
            "url": "https://api.congress.gov/v3/committee/house/hsgo00?format=json"
        }
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/cosponsors
Returns the list of cosponsors on a specified bill.

GET /bill/:congress/:billType/:billNumber/cosponsors

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/cosponsors?api_key=[INSERT_KEY]

Example Response

{
  "cosponsors": [
        {
            "bioguideId": "C001078",
            "district": 11,
            "firstName": "Gerald",
            "fullName": "Rep. Connolly, Gerald E. [D-VA-11]",
            "isOriginalCosponsor": true,
            "lastName": "Connolly",
            "middleName": "E.",
            "party": "D",
            "sponsorshipDate": "2021-05-11",
            "state": "VA",
            "url": "https://api.congress.gov/v3/member/C001078?format=json"
        },
        {
            "bioguideId": "F000450",
            "district": 5,
            "firstName": "Virginia",
            "fullName": "Rep. Foxx, Virginia [R-NC-5]",
            "isOriginalCosponsor": true,
            "lastName": "Foxx",
            "party": "R",
            "sponsorshipDate": "2021-05-11",
            "state": "NC",
            "url": "https://api.congress.gov/v3/member/F000450?format=json"
        },
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
The starting timestamp to filter by sponsorship date. Use format: YYYY-MM-DDT00:00:00Z.

toDateTime
string
(query)
The ending timestamp to filter by sponsorship date. Use format: YYYY-MM-DDT00:00:00Z.

sort
string
(query)
Sort by sponsorship date in Congress.gov. Value can be updateDate+asc or updateDate+desc.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bill/{congress}/{billType}/{billNumber}/relatedbills
Returns the list of related bills to a specified bill.

GET /bill/:congress/:billType/:billNumber/relatedbills

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/relatedbills?api_key=[INSERT_KEY]

Example Response

{
  "relatedBills": [
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2021-05-19",
                "text": "Read twice and referred to the Committee on Homeland Security and Governmental Affairs."
            },
            "number": 1720,
            "relationshipDetails": [
                {
                    "identifiedBy": "CRS",
                    "type": "Related bill"
                }
            ],
            "title": "Postal Service Reform Act of 2021",
            "type": "S",
            "url": "https://api.congress.gov/v3/bill/117/s/1720?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-02-08",
                "actionTime": "14:24:47",
                "text": "Motion to reconsider laid on the table Agreed to without objection."
            },
            "number": 912,
            "relationshipDetails": [
                {
                    "identifiedBy": "House",
                    "type": "Procedurally-related"
                },
                {
                    "identifiedBy": "House",
                    "type": "Related bill"
                }
            ],
            "title": "Providing for consideration of the bill (H.R. 3076) to provide stability to and enhance the services of the United States Postal Service, and for other purposes; providing for consideration of the bill (H.R. 6617) making further continuing appropriations for the fiscal year ending September 30, 2022, and for other purposes; and for other purposes.",
            "type": "HRES",
            "url": "https://api.congress.gov/v3/bill/117/hres/912?format=json"
        },
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/subjects
Returns the list of legislative subjects on a specified bill.

GET /bill/:congress/:billType/:billNumber/subjects

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/subjects?api_key=[INSERT_KEY]

Example Response

{
    "subjects": {
        "legislativeSubjects": [
            {
                "name": "Congressional oversight"
                "updateDate": "2021-09-17T17:30:20Z"
            },
            {
                "name": "Executive agency funding and structure"
                "updateDate": "2021-09-17T17:30:20Z"
            },
        ],
        "policyArea": {
            "name": "Government Operations and Politics",
        }
    }
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/summaries
Returns the list of summaries for a specified bill.

GET /bill/:congress/:billType/:billNumber/summaries

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/summaries?api_key=[INSERT_KEY]

Example Response

{
  "summaries": [
        {
            "actionDate": "2022-03-08",
            "actionDesc": "Passed Senate",
            "text": " <p><strong>Postal Service Reform Act of 202</strong><strong>2</strong></p> <p>This bill addresses the finances and operations of the U.S. Postal Service (USPS).</p> <p>The bill requires the Office of Personnel Management (OPM) to establish the Postal Service Health Benefits Program within the Federal Employees Health Benefits Program under which OPM may contract with carriers to offer health benefits plans for USPS employees and retirees.</p> <p>The bill provides for coordinated enrollment of retirees under this program and Medicare.</p> <p>The bill repeals the requirement that the USPS annually prepay future retirement health benefits.</p> <p>Additionally, the USPS may establish a program to enter into agreements with an agency of any state government, local government, or tribal government, and with other government agencies, to provide certain nonpostal products and services that reasonably contribute to the costs of the USPS and meet other specified criteria.</p> <p>The USPS must develop and maintain a publicly available dashboard to track service performance and must report regularly on its operations and financial condition.</p> <p>The Postal Regulatory Commission must annually submit to the USPS a budget of its expenses. It must also conduct a study to identify the causes and effects of postal inefficiencies relating to flats (e.g., large envelopes).</p> <p>The USPS Office of Inspector General shall perform oversight of the Postal Regulatory Commission. </p>",
            "updateDate": "2022-03-14T18:17:02Z",
            "versionCode": "55"
        },
        {
            "actionDate": "2022-04-06",
            "actionDesc": "Public Law",
            "text": " <p><strong>Postal Service Reform Act of 202</strong><strong>2</strong></p> <p>This bill addresses the finances and operations of the U.S. Postal Service (USPS).</p> <p>The bill requires the Office of Personnel Management (OPM) to establish the Postal Service Health Benefits Program within the Federal Employees Health Benefits Program under which OPM may contract with carriers to offer health benefits plans for USPS employees and retirees.</p> <p>The bill provides for coordinated enrollment of retirees under this program and Medicare.</p> <p>The bill repeals the requirement that the USPS annually prepay future retirement health benefits.</p> <p>Additionally, the USPS may establish a program to enter into agreements with an agency of any state government, local government, or tribal government, and with other government agencies, to provide certain nonpostal products and services that reasonably contribute to the costs of the USPS and meet other specified criteria.</p> <p>The USPS must develop and maintain a publicly available dashboard to track service performance and must report regularly on its operations and financial condition.</p> <p>The Postal Regulatory Commission must annually submit to the USPS a budget of its expenses. It must also conduct a study to identify the causes and effects of postal inefficiencies relating to flats (e.g., large envelopes).</p> <p>The USPS Office of Inspector General shall perform oversight of the Postal Regulatory Commission. </p>",
            "updateDate": "2022-04-11T14:35:39Z",
            "versionCode": "49"
        }
    ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/text
Returns the list of text versions for a specified bill.

GET /bill/:congress/:billType/:billNumber/text

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/text?api_key=[INSERT_KEY]

Example Response

 {
    "textVersions": [
        {
            "date": null,
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076enr.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076enr.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076enr.xml"
                }
            ],
            "type": "Enrolled Bill"
        },
        {
            "date": "2022-02-15T05:00:00Z",
            "formats": [
                {
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076pcs2.htm"
                },
                {
                    "type": "PDF",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076pcs2.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/117/bills/hr3076/BILLS-117hr3076pcs2.xml"
                }
            ],
            "type": "Placed on Calendar Senate"
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

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/bill/{congress}/{billType}/{billNumber}/titles
Returns the list of titles for a specified bill.

GET /bill/:congress/:billType/:billNumber/titles

Example Request

https://api.congress.gov/v3/bill/117/hr/3076/titles?api_key=[INSERT_KEY]

Example Response

 {
    "titles": [
        {
            "title": "Postal Service Reform Act of 2022",
            "titleType": "Display Title"
            "titleTypeCode": 45
            "updateDate": "2023-01-11T13:49:52Z"
        },
        {
            "billTextVersionCode": "RH",
            "billTextVersionName": "Reported in House",
            "chamberCode": "H",
            "chamberName": "House",
            "title": "USPS Fairness Act",
            "titleType": "Short Title(s) as Reported to House for portions of this bill"
            "titleTypeCode": 107
            "updateDate": "2022-06-28T14:30:18Z"
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

billType *
string
(path)
The type of bill. Value can be hr, s, hjres, sjres, hconres, sconres, hres, or sres.

billNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 3076.

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
/law/{congress}
Returns a list of laws filtered by the specified congress.

GET /law/:congress

Example Request

https://api.congress.gov/v3/law/118?api_key=[INSERT_KEY]

Example Response

{
   "bills": [
      {
           "congress": 118,
           "latestAction": {
               "actionDate": "2023-03-20",
               "text": "Became Public Law No: 118-1."
            },
            "laws": [
                {
                    "number": "118-1",
                    "type": "Public Law"
                }
            ]
            "number": "26",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Disapproving the action of the District of Columbia Council in approving the Revised Criminal Code Act of 2022.",
            "type": "HJRES",
            "updateDate": "2024-03-18",
            "updateDateIncludingText": "2024-03-18T20:28:27Z",
            "url": "http://api.congress.gov/v3/bill/118/hjres/26?format=json"
      },
      {
           "congress": 118,
           "latestAction": {
               "actionDate": "2023-07-26",
               "text": "Became Public Law No: 118-10."
           },
           "laws": [
                {
                    "number": "118-1",
                    "type": "Public Law"
                }
            ]
           "number": "1096",
           "originChamber": "House",
           "originChamberCode": "H",
           "title": "250th Anniversary of the United States Marine Corps Commemorative Coin Act",
           "type": "HR",
           "updateDate": "2024-03-18",
           "updateDateIncludingText": "2024-03-18T21:14:03Z",
           "url": "http://api.congress.gov/v3/bill/118/hr/1096?format=json"
        },
   ],
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/law/{congress}/{lawType}
Returns a list of laws filtered by specified congress and law type (public or private).

GET /law/:congress/:lawType

Example Request

https://api.congress.gov/v3/law/118/pub?api_key=[INSERT_KEY]

Example Response

{
   "bills": [
      {
           "congress": 118,
           "latestAction": {
               "actionDate": "2023-03-20",
               "text": "Became Public Law No: 118-1."
            },
            "laws": [
                {
                    "number": "118-1",
                    "type": "Public Law"
                }
            ]
            "number": "26",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Disapproving the action of the District of Columbia Council in approving the Revised Criminal Code Act of 2022.",
            "type": "HJRES",
            "updateDate": "2024-03-18",
            "updateDateIncludingText": "2024-03-18T20:28:27Z",
            "url": "http://api.congress.gov/v3/bill/118/hjres/26?format=json"
      },
      {
           "congress": 118,
           "latestAction": {
               "actionDate": "2023-07-26",
               "text": "Became Public Law No: 118-10."
           },
           "laws": [
                {
                    "number": "118-10",
                    "type": "Public Law"
                }
            ]
           "number": "1096",
           "originChamber": "House",
           "originChamberCode": "H",
           "title": "250th Anniversary of the United States Marine Corps Commemorative Coin Act",
           "type": "HR",
           "updateDate": "2024-03-18",
           "updateDateIncludingText": "2024-03-18T21:14:03Z",
           "url": "http://api.congress.gov/v3/bill/118/hr/1096?format=json"
        },
   ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

lawType *
string
(path)
The law type. Values are either 'pub’or ‘priv.’

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
/law/{congress}/{lawType}/{lawNumber}
Returns a law filtered by specified congress, law type (public or private), and law number.

GET /law/:congress/:lawType/:lawNumber

Example Request

https://api.congress.gov/v3/law/117/pub/108?api_key=[INSERT_KEY]

Example Response

{
    "bill": {
        "actions": {
            "count": 74,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/actions?format=json"
        },
        "amendments": {
            "count": 48,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/amendments?format=json"
        },
        "cboCostEstimates": [
            {
                "description": "As ordered reported by the House Committee on Oversight and Reform on May 13, 2021\n",
                "pubDate": "2021-07-14T17:27:00Z",
                "title": "H.R. 3076, Postal Service Reform Act of 2021",
                "url": "https://www.cbo.gov/publication/57356"
            },
            {
                "description": "As Posted on February 3, 2022,\nand as Amended by Amendment #1, the Manager's Amendment, as Posted on February 4, 2022\n",
                "pubDate": "2022-02-04T18:03:00Z",
                "title": "Estimated Budgetary Effects of Rules Committee Print 117-32 for H.R. 3076, the Postal Service Reform Act of 2022",
                "url": "https://www.cbo.gov/publication/57821"
            }
        ],
        "committeeReports": [
            {
                "citation": "H. Rept. 117-89,Part 1",
                "url": "https://api.congress.gov/v3/committee-report/117/HRPT/89?format=json"
            },
            {
                "citation": "H. Rept. 117-89,Part 2",
                "url": "https://api.congress.gov/v3/committee-report/117/HRPT/89?format=json"
            }
        ],
        "committees": {
            "count": 3,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/committees?format=json"
        },
        "congress": 117,
        "constitutionalAuthorityStatementText": "<pre>\n[Congressional Record Volume 167, Number 81 (Tuesday, May 11, 2021)]\n[House]\nFrom the Congressional Record Online through the Government Publishing Office [<a href="\&quot;https://www.gpo.gov\&quot;">www.gpo.gov</a>]\nBy Mrs. CAROLYN B. MALONEY of New York:\nH.R. 3076.\nCongress has the power to enact this legislation pursuant\nto the following:\nArticle I, Section I, Clause 18 (Necessary and Proper\nClause)\n[Page H2195]\n</pre>",
        "cosponsors": {
            "count": 102,
            "countIncludingWithdrawnCosponsors": 102,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/cosponsors?format=json"
        },
        "introducedDate": "2021-05-11",
        "latestAction": {
            "actionDate": "2022-04-06",
            "text": "Became Public Law No: 117-108."
        },
        "laws": [
            {
                "number": "117-108",
                "type": "Public Law"
            }
        ],
        "number": "3076",
        "originChamber": "House",
        "policyArea": {
            "name": "Government Operations and Politics"
        },
        "relatedBills": {
            "count": 4,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/relatedbills?format=json"
        },
        "sponsors": [
            {
                "bioguideId": "M000087",
                "district": 12,
                "firstName": "CAROLYN",
                "fullName": "Rep. Maloney, Carolyn B. [D-NY-12]",
                "isByRequest": "N",
                "lastName": "MALONEY",
                "middleName": "B.",
                "party": "D",
                "state": "NY",
                "url": "https://api.congress.gov/v3/member/M000087?format=json"
            }
        ],
        "subjects": {
            "count": 17,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/subjects?format=json"
        },
        "summaries": {
            "count": 5,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/summaries?format=json"
        },
        "textVersions": {
            "count": 7,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/text?format=json"
        },
        "title": "Postal Service Reform Act of 2022",
        "titles": {
            "count": 14,
            "url": "https://api.congress.gov/v3/bill/117/hr/3076/titles?format=json"
        },
        "type": "HR",
        "updateDate": "2022-09-29T03:27:05Z",
        "updateDateIncludingText": "2022-09-29T03:27:05Z"
    },
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

lawType *
string
(path)
The law type. Values are either 'pub’or ‘priv.’

lawNumber *
integer
(path)
The law number.

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