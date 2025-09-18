# Member

member
Returns member data from the API


GET
/member
Returns a list of congressional members.

GET /member

Example Request

https://api.congress.gov/v3/member?api_key=[INSERT_KEY]

Example Response

{
    "members": [
    {
        "bioguideId": "L000174",
        "depiction": {
            "attribution": "<a href="\&quot;http://www.senate.gov/artandhistory/history/common/generic/Photo_Collection_of_the_Senate_Historical_Office.htm\&quot;">Courtesy U.S. Senate Historical Office</a>",
            "imageUrl": "https://www.congress.gov/img/member/l000174_200.jpg"
        },
        "district": null,
        "name": "Leahy, Patrick J.",
        "partyName": "Democratic",
        "state": "Vermont",
        "terms": {
            "item": [
                {
                    "chamber": Senate,
                    "endYear": null,
                    "startYear": 1975
                }
            ]
        },
        "updateDate": "2022-11-07T13:42:19Z",
        "url": "https://api.congress.gov/v3/member/L000174?format=json"
    },
    {
        "bioguideId": "K000377",
        "depiction": {
            "attribution": "<a href="\&quot;http://www.senate.gov/artandhistory/history/common/generic/Photo_Collection_of_the_Senate_Historical_Office.htm\&quot;">Courtesy U.S. Senate Historical Office</a>",
            "imageUrl": "https://www.congress.gov/img/member/k000377_200.jpg"
        },
        "district": null,
        "name": "Kelly, Mark",
        "partyName": "Democratic",
        "state": "Arizona",
        "terms": {
            "item": [
                {
                    "chamber": Senate,
                    "end": null,
                    "start": 2020
                }
            ]
        },
        "updateDate": "2023-04-01T12:42:17Z",
        "url": "https://api.congress.gov/v3/member/K000377?format=json"
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

currentMember
string
(query)
The status of the member. Use true or false.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/member/{bioguideId}
Returns detailed information for a specified congressional member.

GET /member/:bioguideId

Example Request

https://api.congress.gov/v3/member/L000174?api_key=[INSERT_KEY]

Example Response

{
    "member": {
        "bioguideId": "L000174",
        "birthYear": "1940",
        "cosponsoredLegislation": {
            "count": 7520,
            "URL": "url": "https://api.congress.gov/v3/member/L000174/cosponsored-legislation"
        },
        "depiction": {
            "attribution": "<a href="\&quot;http://www.senate.gov/artandhistory/history/common/generic/Photo_Collection_of_the_Senate_Historical_Office.htm\&quot;">Courtesy U.S. Senate Historical Office</a>",
            "imageUrl": "https://www.congress.gov/img/member/l000174_200.jpg"
        },
        "directOrderName": "Patrick J. Leahy",
        "firstName": "Patrick",
        "honorificName": "Mr.",
        "invertedOrderName": "Leahy, Patrick J.",
        "lastName": "Leahy",
        "leadership": [
            {
                "congress": 113,
                "type": "President Pro Tempore"
            },
            {
                "congress": 112,
                "type": "President Pro Tempore"
            },
            {
                "congress": 117,
                "type": "President Pro Tempore"
            }
        ],
        "partyHistory": [
            {
                "partyAbbreviation": "D",
                "partyName": "Democrat",
                "startYear": 1975
            }
        ],
        "sponsoredLegislation": {
            "count": 1768,
            "url": "https://api.congress.gov/v3/member/L000174/sponsored-legislation"
        },
        "state": "Vermont",
        "terms": [
            {
                "chamber": "Senate",
                "congress": 116,
                "endYear": 2021,
                "memberType": "Senator",
                "startYear": 2019,
                "stateCode": "VT",
                "stateName": "Vermont"
            },
            {
                "chamber": "Senate",
                "congress": 117,
                "endYear": 2023,
                "memberType": "Senator",
                "startYear": 2021,
                "stateCode": "VT",
                "stateName": "Vermont"
            }
            ...
        ],
        "updateDate": "2022-11-07T13:42:19Z"
    },
    "request": {
        "bioguideId": "l000174",
        "contentType": "application/json",
        "format": "json"
     }
}
Parameters
Try it out
Name	Description
bioguideId *
string
(path)
The bioguide identifier for the congressional member. For example, the value can be L000174.

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
/member/{bioguideId}/sponsored-legislation
Returns the list of legislation sponsored by a specified congressional member.

GET /member/:bioguideId/sponsored-legislation

Example Request

https://api.congress.gov/v3/member/L000174/sponsored-legislation?api_key=[INSERT_KEY]

Example Response

{
     "sponsoredLegislation": [
        {
            "congress": 117,
            "introducedDate": "2022-06-16",
            "latestAction": {
                "actionDate": "2022-06-16",
                "text": "Read twice and referred to the Committee on the Judiciary."
            },
            "number": "4417",
            "policyArea": {
                "name": "Commerce"
            },
            "title": "Patent Trial and Appeal Board Reform Act of 2022",
            "type": "S",
            "url": "https://api.congress.gov/v3/bill/117/s/4417?format=json"
        },
        {
            "congress": 117,
            "introducedDate": "2022-06-09",
            "latestAction": {
                "actionDate": "2022-06-09",
                "text": "Read twice and referred to the Committee on the Judiciary."
            },
            "number": "4373",
            "policyArea": {
                "name": "Crime and Law Enforcement"
            },
            "title": "NDO Fairness Act",
            "type": "S",
            "url": "https://api.congress.gov/v3/bill/117/s/4373?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
bioguideId *
string
(path)
The bioguide identifier for the congressional member. For example, the value can be L000174.

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
/member/{bioguideId}/cosponsored-legislation
Returns the list of legislation cosponsored by a specified congressional member.

GET /member/:bioguideId/cosponsored-legislation

Example Request

https://api.congress.gov/v3/member/L000174/cosponsored-legislation?api_key=[INSERT_KEY]

Example Response

{
     "cosponsoredLegislation": [
        {
            "congress": 117,
            "introducedDate": "2021-05-11",
            "latestAction": {
                "actionDate": "2021-04-22",
                "text": "Read twice and referred to the Committee on Finance."
            },
            "number": "1315",
            "policyArea": {
                "name": "Health"
            },
            "title": "Lymphedema Treatment Act",
            "type": "S",
            "url": "https://api.congress.gov/v3/bill/117/s/1315?format=json"
        },
        {
            "congress": 117,
            "introducedDate": "2021-02-22",
            "latestAction": {
                "actionDate": "2021-03-17",
                "text": "Referred to the Committee on Armed Services."
            },
            "number": "344",
            "policyArea": {
                "name": "Armed Forces and National Security"
            },
            "title": "Major Richard Star Act",
            "type": "S",
            "url": "https://api.congress.gov/v3/bill/117/s/344?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
bioguideId *
string
(path)
The bioguide identifier for the congressional member. For example, the value can be L000174.

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
/member/congress/{congress}
Returns the list of members specified by Congress

GET /member/congress/:congress

Example Request

https://api.congress.gov/v3/member/congress/118?api_key=[INSERT_KEY]

Example Request for a previous Congress

https://api.congress.gov/v3/member/congress/117?currentMember=False&api_key=[INSERT_KEY]

Example Response

{
    "members": [
    {
        "bioguideId": "B001320",
        "depiction": {
            "attribution": "Image courtesy of the Senator's office",
            "imageUrl": "https://www.congress.gov/img/member/b001320_200.jpg"
    },
        "name": "Butler, Laphonza R.",
        "partyName": "Democratic",
        "state": "California",
        "terms": {
            "item": [
                {
                    "chamber": "Senate",
                    "startYear": 2023
                }
            ]
        },
        "updateDate": "2024-04-09T15:54:25Z",
        "url": "http://api.congress.gov/v3/member/B001320?format=json"
    },
    {
         "bioguideId": "A000376",
         "depiction": {
             "attribution": "Image courtesy of the Member",
             "imageUrl": "https://www.congress.gov/img/member/a000376_200.jpg"
    },
          "district": 32,
          "name": "Allred, Colin Z.",
          "partyName": "Democratic",
          "state": "Texas",
          "terms": {
              "item": [
                  {
                      "chamber": "House of Representatives",
                      "startYear": 2019
                  }
              ]
          },
         "updateDate": "2024-04-09T13:26:21Z",
         "url": "http://api.congress.gov/v3/member/A000376?format=json"
    },
  ]
}
Parameters
Try it out
Name	Description
congress *
string
(path)
The congress for the congressional member. For example, the value can be 118.

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

currentMember
string
(query)
The status of the member. Use true or false. Use currentMember=false for the most accurate calls for past Congresses.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/member/{stateCode}
Returns a list of members filtered by state.

GET /member/:stateCode

Example Request

https://api.congress.gov/v3/member/MI?api_key=[INSERT_KEY]

Example Response

{
   "members": [
   {
       "bioguideId": "J000307",
       "depiction": {
           "attribution": "Image courtesy of the Member",
           "imageUrl": "https://www.congress.gov/img/member/j000307_200.jpg"
   },
       "district": 10,
       "name": "James, John",
       "partyName": "Republican",
       "state": "Michigan",
       "terms": {
           "item": [
               {
                   "chamber": "House of Representatives",
                   "startYear": 2023
               }
           ]
       },
       "updateDate": "2024-03-22T18:36:13Z",
       "url": "http://api.congress.gov/v3/member/J000307?format=json"
 },
]
}

Parameters
Try it out
Name	Description
stateCode *
string
(path)
The two letter identifier for the state the member represents. For example, the value can be MI for Michigan.

format
string
(query)
The data format. Value can be xml or json.

limit
integer
(query)
The number of records returned. The maximum limit is 250. To get the entire delegation of a particular state, use the total number of members and senators as the limit.

currentMember
string
(query)
The status of the member. Use true or false. Use currentMember=True for the current congress data only.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/member/{stateCode}/{district}
Returns a list of members filtered by state and district.

GET /member/:stateCode/:district

Example Request

https://api.congress.gov/v3/member/MI/10?api_key=[INSERT_KEY]

Example Response

{
 "members": [
 {
     "bioguideId": "J000307",
     "depiction": {
         "attribution": "Image courtesy of the Member",
         "imageUrl": "https://www.congress.gov/img/member/j000307_200.jpg"
 },
     "district": 10,
     "name": "James, John",
     "partyName": "Republican",
     "state": "Michigan",
     "terms": {
         "item": [
             {
                 "chamber": "House of Representatives",
                 "startYear": 2023
             }
         ]
     },
     "updateDate": "2024-03-22T18:36:13Z",
     "url": "http://api.congress.gov/v3/member/J000307?format=json"
  },
 ]
}
Parameters
Try it out
Name	Description
stateCode *
string
(path)
The two letter identifier for the state the member represents. For example, the value can be MI for Michigan.

district *
integer
(path)
The district number for the district the member represents. For example, the value can be 10.

format
string
(query)
The data format. Value can be xml or json.

currentMember
string
(query)
The status of the member. Use true or false. Use currentMember=True for the current congress data only.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/member/congress/{congress}/{stateCode}/{district}
Returns a list of members filtered by congress, state and district.

GET /member/congress/:congress/:stateCode/:district

Example Request

https://api.congress.gov/v3/member/congress/118/MI/10?currentMember=True&api_key=[INSERT_KEY]

Example Request for a previous Congress

https://api.congress.gov/v3/member/congress/97/TX/10?currentMember=False&api_key=[INSERT_KEY]

Example Response

{
 "members": [
 {
     "bioguideId": "J000307",
     "depiction": {
         "attribution": "Image courtesy of the Member",
         "imageUrl": "https://www.congress.gov/img/member/j000307_200.jpg"
 },
     "district": 10,
     "name": "James, John",
     "partyName": "Republican",
     "state": "Michigan",
     "terms": {
         "item": [
             {
                 "chamber": "House of Representatives",
                 "startYear": 2023
             }
         ]
     },
     "updateDate": "2024-03-22T18:36:13Z",
     "url": "http://api.congress.gov/v3/member/J000307?format=json"
   },
 ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The Congress number. For example, 118.

stateCode *
string
(path)
The two letter identifier for the state the member represents. For example, the value can be MI for Michigan.

district *
integer
(path)
The district number for the district the member represents. For example, the value can be 10.

format
string
(query)
The data format. Value can be xml or json.

currentMember
string
(query)
The status of the member. Use true or false. Use currentMember=True for the current congress data only.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

[BETA] house-vote
Returns House of Representatives roll call vote data from the API


GET
/house-vote
Returns House of Representatives roll call vote data from the API. This endpoint is currently in beta.

GET /house-vote

Example Request

https://api.congress.gov/v3/house-vote?api_key=[INSERT_KEY]

Example Response

{
    "houseRollCallVotes": [
        {
           "congress": 119,
           "identifier": 1191202517,
           "legislationNumber": "30",
           "legislationType": "HR",
           "legislationUrl": "https://congress.gov/bill/119/house-bill/30",
           "result": "Passed",
           "rollCallNumber": 17,
           "sessionNumber": 1,
           "sourceDataURL": "https://clerk.house.gov/evs/2025/roll017.xml",
           "startDate": "2025-01-16T11:00:00-05:00",
           "updateDate": "2025-04-18T08:44:47-04:00",
           "url": "https://api.congress.gov/v3/house-vote/119/1/17",
           "voteType": "Yea-and-Nay"
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/house-vote/{congress}
Returns House of Representatives roll call vote data from the API filtered by the specified Congress. This endpoint is currently in beta.

GET /house-vote/:congress

Example Request

https://api.congress.gov/v3/house-vote/119?api_key=[INSERT_KEY]

Example Response

{
    "houseRollCallVotes": [
        {
           "congress": 119,
           "identifier": 1191202517,
           "legislationNumber": "30",
           "legislationType": "HR",
           "legislationUrl": "https://congress.gov/bill/119/house-bill/30",
           "result": "Passed",
           "rollCallNumber": 17,
           "sessionNumber": 1,
           "sourceDataURL": "https://clerk.house.gov/evs/2025/roll017.xml",
           "startDate": "2025-01-16T11:00:00-05:00",
           "updateDate": "2025-04-18T08:44:47-04:00",
           "url": "https://api.congress.gov/v3/house-vote/119/1/17",
           "voteType": "Yea-and-Nay"
        },
    ],
 }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 119.

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
/house-vote/{congress}/{session}
Returns House of Representatives roll call vote data from the API filtered by the specified Congress and session. This endpoint is currently in beta.

GET /house-vote/:congress/:session

Example Request

https://api.congress.gov/v3/house-vote/119/1?api_key=[INSERT_KEY]

Example Response

{
    "houseRollCallVotes": [
        {
           "congress": 119,
           "identifier": 1191202517,
           "legislationNumber": "30",
           "legislationType": "HR",
           "legislationUrl": "https://congress.gov/bill/119/house-bill/30",
           "result": "Passed",
           "rollCallNumber": 17,
           "sessionNumber": 1,
           "sourceDataURL": "https://clerk.house.gov/evs/2025/roll017.xml",
           "startDate": "2025-01-16T11:00:00-05:00",
           "updateDate": "2025-04-18T08:44:47-04:00",
           "url": "https://api.congress.gov/v3/house-vote/119/1/17",
           "voteType": "Yea-and-Nay"
        },
    ],
 }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 119.

session *
integer
(path)
The session number. The value can be 1 or 2.

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
/house-vote/{congress}/{session}/{voteNumber}
Returns detailed information for a specified House of Representatives roll call vote. This endpoint is currently in beta.

GET /house-vote/:congress/:session/:voteNumber

Example Request

https://api.congress.gov/v3/house-vote/119/1/17?api_key=[INSERT_KEY]

Example Response

  {
      "houseRollCallVote": [
        {
            "congress": 119,
            "identifier": 1191202517,
            "legislationNumber": "30",
            "legislationType": "HR",
            "legislationUrl": "https://congress.gov/bill/119/house-bill/30",
            "result": "Passed",
            "rollCallNumber": 17,
            "sessionNumber": 1,
            "sourceDataURL": "https://clerk.house.gov/evs/2025/roll017.xml",
            "startDate": "2025-01-16T11:00:00-05:00",
            "updateDate": "2025-04-18T08:44:47-04:00",
            "votePartyTotal": [
                {
                     "nayTotal": 0,
                     "notVotingTotal": 6,
                     "party": {
                         "name": "Republican",
                         "type": "R"
                },
                     "presentTotal": 0,
                     "voteParty": "R",
                     "yeaTotal": 213
                },
                {
                     "nayTotal": 145,
                     "notVotingTotal": 9,
                     "party": {
                         "name": "Democrat",
                         "type": "D"
                },
                     "presentTotal": 0,
                     "voteParty": "D",
                     "yeaTotal": 61
                },
                {
                     "nayTotal": 0,
                     "notVotingTotal": 0,
                     "party": {
                         "name": "Independent",
                         "type": "I"
                },
                     "presentTotal": 0,
                     "voteParty": "I",
                     "yeaTotal": 0
                }
           ],
           "voteQuestion": "On Passage",
           "voteType": "Yea-and-Nay"
      },
    ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 119.

session *
integer
(path)
The session number. The value can be 1 or 2.

voteNumber *
integer
(path)
The assigned roll call vote number. For example, 17.

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
/house-vote/{congress}/{session}/{voteNumber}/members
Returns detailed information for how members voted on a specified House of Representatives roll call vote. This endpoint is currently in beta.

GET /house-vote/:congress/:session/:voteNumber/members

Example Request

https://api.congress.gov/v3/house-vote/119/1/17/members?api_key=[INSERT_KEY]

Example Response

  {
      "houseRollCallMemberVotes": [
        {
            "congress": 119,
            "identifier": 1191202517,
            "legislationNumber": "30",
            "legislationType": "HR",
            "legislationUrl": "https://congress.gov/bill/119/house-bill/30",
            "results": [
                {
                  "bioguideID": "A000055",
                  "firstName": "Robert",
                  "lastName": "Aderholt",
                  "voteCast": "Yea",
                  "voteParty": "R",
                  "voteState": "AL"
                },
                {
                  "bioguideID": "A000148",
                  "firstName": "Jake",
                  "lastName": "Auchincloss",
                  "voteCast": "Nay",
                  "voteParty": "D",
                  "voteState": "MA"
                }
           ],
           "result": "Passed",
           "rollCallNumber": 17,
           "sessionNumber": 1,
           "sourceDataURL": "https://clerk.house.gov/evs/2025/roll017.xml",
           "startDate": "2025-01-16T11:00:00-05:00",
           "updateDate": "2025-04-18T08:44:47-04:00",
           "voteQuestion": "On Passage",
           "voteType": "Yea-and-Nay"
      },
    ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 119.

session *
integer
(path)
The session number. The value can be 1 or 2.

voteNumber *
integer
(path)
The assigned roll call vote number. For example, 17.

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