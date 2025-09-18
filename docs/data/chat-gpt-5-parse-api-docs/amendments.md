# Amendments

amendments
Returns amendment data from the API


GET
/amendment
Returns a list of amendments sorted by date of latest action.

GET /amendment/

Example Request

https://api.congress.gov/v3/amendment?api_key=[INSERT_KEY]

Example Response

{
    "amendments": [
        {
           "congress": 117,
           "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312."
            },
            "number": "2137",
            "purpose": "In the nature of a substitute.",
            "type": "SAMDT",
            "url": "http://api.congress.gov/v3/amendment/117/samdt/2137?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2131 agreed to in Senate by Voice Vote. "
            },
            "number": "2131",
            "purpose": "To strike a definition.",
            "type": "SAMDT",
            "updateDate": "2022-02-25T17:34:49Z",
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2131?format=json"
        }
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/amendment/{congress}
Returns a list of amendments filtered by the specified congress, sorted by date of latest action.

GET /amendment/:congress

Example Request

https://api.congress.gov/v3/amendment/117?api_key=[INSERT_KEY]

Example Response

{
    "amendments": [
        {
           "congress": 117,
           "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312."
            },
            "number": "2137",
            "purpose": "In the nature of a substitute.",
            "type": "SAMDT",
            "url": "http://api.congress.gov/v3/amendment/117/samdt/2137?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2131 agreed to in Senate by Voice Vote. "
            },
            "number": "2131",
            "purpose": "To strike a definition.",
            "type": "SAMDT",
            "updateDate": "2022-02-25T17:34:49Z",
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2131?format=json"
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
/amendment/{congress}/{amendmentType}
Returns a list of amendments filtered by the specified congress and amendment type, sorted by date of latest action.

GET /amendment/:congress/:amendmentType

Example Request

https://api.congress.gov/v3/amendment/117/samdt?api_key=[INSERT_KEY]

Example Response

{
    "amendments": [
        {
           "congress": 117,
           "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312."
            },
            "number": "2137",
            "purpose": "In the nature of a substitute.",
            "type": "SAMDT",
            "url": "http://api.congress.gov/v3/amendment/117/samdt/2137?format=json"
        },
        {
            "congress": 117,
            "latestAction": {
                "actionDate": "2021-08-08",
                "text": "Amendment SA 2131 agreed to in Senate by Voice Vote. "
            },
            "number": "2131",
            "purpose": "To strike a definition.",
            "type": "SAMDT",
            "updateDate": "2022-02-25T17:34:49Z",
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2131?format=json"
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

amendmentType *
string
(path)
The type of amendment. Value can be hamdt, samdt, or suamdt.

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
/amendment/{congress}/{amendmentType}/{amendmentNumber}
Returns detailed information for a specified amendment.

GET /amendment/:congress/:amendmentType/:amendmentNumber

Example Request

https://api.congress.gov/v3/amendment/117/samdt/2137?api_key=[INSERT_KEY]

Example Response

{
    "amendment": {
        "actions": {
            "count": 19,
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2137/actions?format=json"
        },
        "amendedBill": {
            "congress": 117,
            "number": "3684",
            "originChamber": "House",
            "originChamberCode": "H",
            "title": "Infrastructure Investment and Jobs Act",
            "type": "HR",
            "url": "https://api.congress.gov/v3/bill/117/hr/3684?format=json"
        },
        "amendmentsToAmendment": {
             "count": 507,
             "url": "https://api.congress.gov/v3/amendment/117/samdt/2137/amendments?format=json"
        },
        "chamber": "Senate",
        "congress": 117,
        "cosponsors": {
            "count": 9,
            "countIncludingWithdrawnCosponsors": 9,
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2137/cosponsors?format=json"
        },
        "latestAction": {
            "actionDate": "2021-08-08",
            "text": "Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312."
        },
        "number": "2137",
        "proposedDate": "2021-08-01T04:00:00Z",
        "purpose": "In the nature of a substitute.",
        "sponsors": [
            {
                "bioguideId": "S001191",
                "firstName": "Kyrsten",
                "fullName": "Sen. Sinema, Kyrsten [D-AZ]",
                "lastName": "Sinema",
                "url": "https://api.congress.gov/v3/member/S001191?format=json"
            }
        ],
        "submittedDate": "2021-08-01T04:00:00Z",
        "type": "SAMDT"
        "updateDate": "2022-02-08T17:27:59Z",
    }
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

amendmentType *
string
(path)
The type of amendment. Value can be hamdt, samdt, or suamdt.

amendmentNumber *
integer
(path)
The amendment’s assigned number. For example, the value can be 2137.

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
/amendment/{congress}/{amendmentType}/{amendmentNumber}/actions
Returns the list of actions on a specified amendment.

GET /amendment/:congress/:amendmentType/:amendmentNumber/actions

Example Request

https://api.congress.gov/v3/amendment/117/samdt/2137/actions?api_key=[INSERT_KEY]

Example Response

{
    "actions": [
        {
           "actionDate": "2021-08-08",
           "recordedVotes": [
             {
               "chamber": "Senate",
               "congress": 117,
               "date": "2021-08-09T00:45:48Z",
               "rollNumber": 312,
               "sessionNumber": 1,
               "url": "https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00312.xml"
             }
           ],
           "sourceSystem": {
             "code": 0,
             "name": "Senate"
           },
           "text": "Amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 69 - 28. Record Vote Number: 312.",
           "type": "Floor",
        },
        {
            "actionDate": "2021-08-08",
            "recordedVotes": [
                {
                    "chamber": "Senate",
                    "congress": 117,
                    "date": "2021-08-09T00:37:19Z",
                    "rollNumber": 311,
                    "sessionNumber": 1,
                    "url": "https://www.senate.gov/legislative/LIS/roll_call_votes/vote1171/vote_117_1_00311.xml"
                }
            ],
            "sourceSystem": {
                "code": 0,
                "name": "Senate"
            },
            "text": "Motion to waive all applicable budgetary discipline with respect to amendment SA 2137 agreed to in Senate by Yea-Nay Vote. 64 - 33. Record Vote Number: 311. ",
            "type": "Floor"
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

amendmentType *
string
(path)
The type of amendment. Value can be hamdt, samdt, or suamdt.

amendmentNumber *
integer
(path)
The amendment’s assigned number. For example, the value can be 2137.

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
/amendment/{congress}/{amendmentType}/{amendmentNumber}/cosponsors
Returns the list of cosponsors on a specified amendment.

GET /amendment/:congress/:amendmentType/:amendmentNumber/cosponsors

Example Request

https://api.congress.gov/v3/amendment/117/samdt/2137/cosponsors?api_key=[INSERT_KEY]

Example Response

{
    "cosponsors": [
        {
            "bioguideId": "P000449",
            "firstName": "Rob",
            "fullName": "Sen. Portman, Rob [R-OH]",
            "isOriginalCosponsor": true,
            "lastName": "Portman",
            "party": "R",
            "sponsorshipDate": "2021-08-01",
            "url": "https://api.congress.gov/v3/member/P000449?format=json"
        },
        {
            "bioguideId": "M001183",
            "firstName": "Joseph",
            "fullName": "Sen. Manchin, Joe, III [D-WV]",
            "isOriginalCosponsor": true,
            "lastName": "Manchin",
            "party": "D",
            "sponsorshipDate": "2021-08-01",
            "state": "WV",
            "url": "https://api.congress.gov/v3/member/M001183?format=json"
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

amendmentType *
string
(path)
The type of amendment. Value can be hamdt, samdt, or suamdt.

amendmentNumber *
integer
(path)
The amendment’s assigned number. For example, the value can be 2137.

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
/amendment/{congress}/{amendmentType}/{amendmentNumber}/amendments
Returns the list of amendments to a specified amendment.

GET /amendment/:congress/:amendmentType/:amendmentNumber/amendments

Example Request

https://api.congress.gov/v3/amendment/117/samdt/2137/amendments?api_key=[INSERT_KEY]

Example Response

{
    "amendments": [
        {
            "congress": 117,
            "latestAction": {
                "date": "2021-08-04",
                "text": "Amendment SA 2548 agreed to in Senate by Voice Vote."
            },
            "number": "2548",
            "purpose": "To require the Secretary of Agriculture to establish a Joint Chiefs Landscape Restoration Partnership program.",
            "type": "SAMDT",
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2548?format=json"
        },
        {
            "congress": 117,
            "number": "2547",
            "type": "SAMDT",
            "updateDate": "2022-02-25T17:34:50Z",
            "url": "https://api.congress.gov/v3/amendment/117/samdt/2547?format=json"
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

amendmentType *
string
(path)
The type of amendment. Value can be hamdt, samdt, or suamdt.

amendmentNumber *
integer
(path)
The amendment’s assigned number. For example, the value can be 2137.

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
/amendment/{congress}/{amendmentType}/{amendmentNumber}/text
Returns the list of text versions for a specified amendment from the 117th Congress onwards.

GET /amendment/:congress/:amendmentType/:amendmentNumber/text

Example Request

https://api.congress.gov/v3/amendment/117/hamdt/287/text?api_key=[INSERT_KEY]

Example Response

 {
    "textVersions": [
        {
            "date": "2022-07-14T06:20:29Z",
            "formats": [
                {
                    "type": "PDF",
                    "url":"https://www.congress.gov/117/crec/2022/07/13/168/115/CREC-2022-07-13-pt2-PgH6339-2.pdf"
                },
                {
                    "type": "Formatted XML",
                    "url": "https://www.congress.gov/117/crec/2022/07/13/168/115/modified/CREC-2022-07-13-pt2-PgH6339-2.htm"
                }
            ],
            "type": "Offered"
        },
    ]
 }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. This is endpoint is for the 117th Congress and onwards. For example, the value can be 117.

amendmentType *
string
(path)
The type of amendment. Value can be hamdt or samdt.

amendmentNumber *
integer
(path)
The bill’s assigned number. For example, the value can be 287.

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