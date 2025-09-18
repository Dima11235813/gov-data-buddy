# Nomination

nomination
Returns nomination data from the API


GET
/nomination
Returns a list of nominations sorted by date received from the President.

GET /nomination

Example Request

https://api.congress.gov/v3/nomination?api_key=[INSERT_KEY]

Example Response

{
    "nominations": [
        {
            "citation": "PN2804",
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-12-07",
                "text": "Received in the Senate and referred to the Committee on Armed Services."
            },
            "nominationType": {
                "isMilitary": true
            },
            "number": 2804,
            "organization": "Army",
            "partNumber": "00",
            "receivedDate": "2022-12-07",
            "updateDate": "2022-12-08T05:25:17Z",
            "url": "https://api.congress.gov/v3/nomination/117/2804?format=json"
        },
        {
            "citation": "PN2803",
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-12-07",
                "text": "Received in the Senate and referred to the Committee on Armed Services."
            },
            "nominationType": {
                "isMilitary": true
            },
            "number": 2803,
            "organization": "Army",
            "partNumber": "00",
            "receivedDate": "2022-12-07",
            "updateDate": "2022-12-08T05:25:17Z",
            "url": "https://api.congress.gov/v3/nomination/117/2803?format=json"
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/nomination/{congress}
Returns a list of nominations filtered by the specified congress and sorted by date received from the President.

GET /nomination/:congress

Example Request

https://api.congress.gov/v3/nomination/117?api_key=[INSERT_KEY]

Example Response

{
    "nominations": [
        {
            "citation": "PN2804",
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-12-07",
                "text": "Received in the Senate and referred to the Committee on Armed Services."
            },
            "nominationType": {
                "isMilitary": true
            },
            "number": 2804,
            "organization": "Army",
            "partNumber": "00",
            "receivedDate": "2022-12-07",
            "updateDate": "2022-12-08T05:25:17Z",
            "url": "https://api.congress.gov/v3/nomination/117/2804?format=json"
        },
        {
            "citation": "PN2803",
            "congress": 117,
            "latestAction": {
                "actionDate": "2022-12-07",
                "text": "Received in the Senate and referred to the Committee on Armed Services."
            },
            "nominationType": {
                "isMilitary": true
            },
            "number": 2803,
            "organization": "Army",
            "partNumber": "00",
            "receivedDate": "2022-12-07",
            "updateDate": "2022-12-08T05:25:17Z",
            "url": "https://api.congress.gov/v3/nomination/117/2803?format=json"
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/nomination/{congress}/{nominationNumber}
Returns detailed information for a specified nomination.

GET /nomination/:congress/:nominationNumber

Example Request

https://api.congress.gov/v3/nomination/117/2467?api_key=[INSERT_KEY]

Example Response

{
    "nomination": {
        "actions": {
            "count": 1,
            "url": "https://api.congress.gov/v3/nomination/117/2467/actions?format=json"
        },
        "citation": "PN2467",
        "committees": {
            "count": 1,
            "url": "https://api.congress.gov/v3/nomination/117/2467/committees?format=json"
        },
        "congress": 117,
        "isList": true,
        "latestAction": {
            "actionDate": "2022-08-03",
            "text": "Received in the Senate and referred to the Committee on Armed Services."
        },
        "nominees": [
            {
                "introText": "THE FOLLOWING NAMED OFFICERS FOR APPOINTMENT TO THE GRADE INDICATED IN THE UNITED STATES AIR FORCE UNDER TITLE 10, U.S.C., SECTION 624:",
                "nomineeCount": 12,
                "ordinal": 1,
                "organization": "Air Force",
                "positionTitle": "Colonel",
                "url": "https://api.congress.gov/v3/nomination/117/2467/1?format=json"
            }
        ],
        "number": 2467,
        "partNumber": "00",
        "receivedDate": "2022-08-03",
        "updateDate": "2022-08-04T04:25:12Z"
    },
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

nominationNumber *
integer
(path)
The nomination’s assigned number. For example, the value can be 2467.

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
/nomination/{congress}/{nominationNumber}/{ordinal}
Returns the list nominees for a position within the nomination.

GET /nomination/:congress/:nominationNumber/:ordinal

Example Request

https://api.congress.gov/v3/nomination/117/2467/1?api_key=[INSERT_KEY]

Example Response

{
    "nominees": [
        {
            "firstName": "JOHN",
            "lastName": "SZCZEPANSKI",
            "middleName": "T.",
            "ordinal": 12
        },
        {
            "firstName": "ERIN",
            "lastName": "REYNOLDS",
            "middleName": "S.",
            "ordinal": 11
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

nominationNumber *
integer
(path)
The nomination’s assigned number. For example, the value can be 2467.

ordinal *
integer
(path)
The ordinal number. For example, the value can be 1.

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
/nomination/{congress}/{nominationNumber}/actions
Returns the list of actions on a specified nomination.

GET /nomination/:congress/:nominationNumber/actions

Example Request

https://api.congress.gov/v3/nomination/117/2467/actions?api_key=[INSERT_KEY]

Example Response

{
    "actions": [
        {
            "actionCode": "S05120",
            "actionDate": "2022-08-03",
            "committees": [
              {
                "name": "Armed Services Committee",
                "systemCode": "ssas00"
                "url":
                  "https://api.congress.gov/v3/committee/senate/ssas00?format=json"
              }
            ],
            "text": "Received in the Senate and referred to the Committee on Armed Services.",
            "type": "IntroReferral"
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

nominationNumber *
integer
(path)
The nomination’s assigned number. For example, the value can be 2467.

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
/nomination/{congress}/{nominationNumber}/committees
Returns the list of committees associated with a specified nomination.

GET /nomination/:congress/:nominationNumber/committees

Example Request

https://api.congress.gov/v3/nomination/117/2467/committees?api_key=[INSERT_KEY]

Example Response

{
        "committees": [
            {
                "activities": [
                    {
                        "date": "2022-08-03T21:02:58Z",
                        "name": "Referred to"
                    },
                ],
                "chamber": "Senate",
                "name": "Armed Services Committee",
                "systemCode": "ssas00",
                "type": "Standing",
                "url": "https://api.congress.gov/v3/committee/senate/ssas00?format=json"
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

nominationNumber *
integer
(path)
The nomination’s assigned number. For example, the value can be 2467.

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
/nomination/{congress}/{nominationNumber}/hearings
Returns the list of printed hearings associated with a specified nomination.

GET /nomination/:congress/:nominationNumber/hearings

Example Request

https://api.congress.gov/v3/nomination/116/389/hearings?api_key=[INSERT_KEY]

Example Response

{
    "hearings": [
        {
          "chamber": "Senate",
          "citation": "S.Hrg.116-38",
          "date": "2019-06-05",
          "jacketNumber": 37106,
          "number": 38
        }
    ],
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 116.

nominationNumber *
integer
(path)
The nomination’s assigned number. For example, the value can be 389.

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

crsreport
Returns Congressional Research Service (CRS) report data from the API


GET
/crsreport
Returns Congressional Research Service (CRS) report data from the API

GET /crsreport

Example Request

https://api.congress.gov/v3/crsreport?api_key=[INSERT_KEY]

Example Response

  {
      "CRSReports": [
         {
              "contentType": "Reports",
              "id": "R43083",
              "publishDate": "2025-02-05T11:34:25Z",
              "status": "Active",
              "title": "SBA Assistance to Small Business Startups: Client Experiences and Program Impact",
              "updateDate": "2025-02-07T01:36:49Z",
              "url": "http://api.congress.gov/v3/crsreport/R43083",
              "version": 145
          },
          {
              "contentType": "Reports",
              "id": "98-202",
              "publishDate": "2025-02-05T10:41:39Z",
              "status": "Archived",
              "title": "Appropriations for FY1999: Treasury, Postal Service, Executive Office of the President, and General Government",
              "updateDate": "2025-02-05T10:41:39Z",
              "url": "http://api1.test.congress.gov/v3/crsreport/98-202",
              "version": 102
          }
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
/crsreport/{reportNumber}
Returns detailed information for a specificed Congressional Research Service (CRS) report

GET /crsreport/:reportNumber

Example Request

https://api.congress.gov/v3/crsreport/R47175?api_key=[INSERT_KEY]

Example Response

  {
      "CRSReport": {
              "authors": [
                   {
                       "author": "Megan S. Lynch"
                   }
              ],
              "contentType": "Reports",
              "formats": [
                  {
                       "format": "PDF",
                       "url": "https://congress.gov/crs_external_products/R/PDF/R47175/R47175.2.pdf"
                  },
                  {
                       "format": "HTML",
                       "url": "https://congress.gov/crs_external_products/R/HTML/R47175.html"
                  }
              ],
              "id": "R47175",
              "publishDate": "2025-02-05T11:34:31Z",
              "relatedMaterials": [
                  {
                                "URL": "https://api.congress.gov/v3/law/93/pub/344",
                                "congress": 93,
                                "number": "93-344",
                                "title": null,
                                "type": "PUB"
                   },
                   {
                                "URL": "https://api.congress.gov/v3/bill/117/HRES/1151",
                                "congress": 117,
                                "number": 1151,
                                "title": "Providing for budget allocations, and for other purposes.",
                                "type": "HRES"
                    },
                    {
                                "URL": "https://api.congress.gov/v3/bill/117/HRES/1151",
                                "congress": 117,
                                "number": 1151,
                                "title": "Providing for budget allocations, and for other purposes.",
                                "type": "HRES"
                    }
               ],
               "status": "Active",
               "summary": "The Congressional Budget Act of 1974 directs Congress to adopt a budget resolution each spring, providing an agreement between the House and Senate on a budget plan for the upcoming fiscal year (and at least four additional years). The annual budget resolution includes certain spending and revenue levels that become enforceable through points of order once both chambers have adopted the resolution.Congress does not always adopt a budget resolution, however, and this may complicate the development and consideration of budgetary legislation. Congress has, therefore, developed an alternative legislative tool, typically referred to as a “deeming resolution” because it is deemed to serve in place of an annual budget resolution for the purposes of establishing enforceable budgetary levels. On June 8, 2022, the House of Representatives adopted H.Res. 1151, a deeming resolution for FY2023. H.Res. 1151 provided a committee spending allocation (302(a) allocation) to the House Appropriations Committee ($1.603 trillion). It also directed the chair of the House Budget Committee to subsequently file a statement in the Congressional Record that includes committee spending allocations for all other committees, as well as aggregate spending and revenue levels. (Those levels were filed on June 21, 2022.) H.Res. 1151 specified that the levels filed in the Congressional Record be consistent with the “most recent baseline of the Congressional Budget Office,” meaning that the committee spending allocations (other than for the Appropriations Committee) and the aggregate spending and revenue levels have been set at the levels currently projected under current law. In addition to providing enforceable budgetary levels within the House, H.Res. 1151 grants authority to the chair of the House Budget Committee to “adjust” the budgetary levels provided under the deeming resolution in the future under specified circumstances. In addition, the resolution states that provisions designated as “emergency” shall be effectively exempt from House budgetary rules and specifies that certain accounts may receive advance appropriations for FY2024 and FY2025.",
              "title": "Setting Budgetary Levels: The House's FY2023 Deeming Resolution",
              "topics": [
                  {
                      "topic": "Budget &amp; Appropriations Procedure"
                  }
              ],
              "updateDate": "2025-02-07T01:36:56Z",
              "url": "congress.gov/crs-report/R47175",
              "version": 102
       },
   }
Parameters
Try it out
Name	Description
reportNumber *
string
(path)
The number or ID of the report. For example, R47175.

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