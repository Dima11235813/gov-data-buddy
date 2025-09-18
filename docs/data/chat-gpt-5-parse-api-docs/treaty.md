# Treaty

treaty
Returns treaty data from the API


GET
/treaty
Returns a list of treaties sorted by date of last update.

GET /treaty

Example Request

https://api.congress.gov/v3/treaty?api_key=[INSERT_KEY]

Example Response

{
    "treaties": [
        {
          "congressReceived": 116,
          "congressConsidered": 116,
          "number": 1,
          "parts": {},
          "suffix": "",
          "topic": "International Law and Organization",
          "transmittedDate": "2022-07-11T00:00:00Z",
          "updateDate": "2022-08-04T02:46:11Z",
          "url": "https://api.congress.gov/v3/treaty/116/1?format=json"
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
/treaty/{congress}
Returns a list of treaties for the specified congress, sorted by date of last update.

GET /treaty/:congress

Example Request

https://api.congress.gov/v3/treaty/117?api_key=[INSERT_KEY]

Example Response

{
    "treaties": [
        {
          "congressReceived": 116,
          "congressConsidered": 116,
          "number": 1,
          "parts": {},
          "suffix": "",
          "topic": "International Law and Organization",
          "transmittedDate": "2022-07-11T00:00:00Z",
          "updateDate": "2022-08-04T02:46:11Z",
          "url": "https://api.congress.gov/v3/treaty/116/1?format=json"
        }
    ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, value can be 117.

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
/treaty/{congress}/{treatyNumber}
Returns detailed information for a specified treaty.

GET /treaty/:congress/:treatyNumber

Example Request

https://api.congress.gov/v3/treaty/117/3?api_key=[INSERT_KEY]

Example Response

  {

      "request": {
      "congress": "116",
      "contentType": "application/json",
      "format": "json"
  },
      "treaty": {
         "actions": {
            "count": 18,
            "url": "http://api.congress.gov/v3/treaty/116/1/actions?format=json"
          },
           "congressConsidered": 116,
           "congressReceived": 116,
           "countriesParties": [
               {
                  "name": "North Macedonia, The Republic of"
               }
            ],
            "inForceDate": null,
            "indexTerms": [
                {
                  "name": "116-1"
                },
                {
                  "name": "Accession"
                },
                {
                  "name": "North Atlantic Treaty of 1949"
                },
                {
                  "name": "North Macedonia"
                },
                {
                  "name": "North Macedonia, The Republic of"
                },
                {
                  "name": "TD116-1"
                },
                {
                  "name": "The Republic of North Macedonia"
                },
                {
                  "name": "Ex. Rept. 116-5"
                }
            ],
            "number": 1,
            "oldNumber": null,
            "oldNumberDisplayName": null,
            "parts": {},
            "relatedDocs":
              {
                  "citation": "Ex. Rept. 116-5",
                  "url": "http://api.congress.gov/v3/committee-report/116/ERPT/5"
              }
          ],
          "resolutionText": "[117] TreatyRes. 6 for TreatyDoc. 117 - 3<p>As approved by the Senate: </p><p><i>Resolved (two-thirds of the Senators present concurring therein),</i></p><p></p><p><b>SECTION 1. SENATE ADVICE AND CONSENT SUBJECT TO DECLARATIONS AND CONDITIONS.</b></p>...",
          "suffix": "",
          "titles": [
              {
                  "title": "Protocol to the North Atlantic Treaty of 1949 on the Accession of the Republic of North Macedonia",
                  "titleType": "Treaty - Short Title"
              },
              {
                  "title": "Protocol to the North Atlantic Treaty of 1949 on the Accession of the Republic of North Macedonia",
                  "titleType": "Treaty - Formal Title"
              }
          ],
          "topic": "International Law and Organization",
          "transmittedDate": "2022-07-11T00:00:00Z",
          "updateDate": "2022-08-04T02:46:11Z",
        }
    ]
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, value can be 117.

treatyNumber *
integer
(path)
The treaty’s assigned number. For example, value can be 3.

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
/treaty/{congress}/{treatyNumber}/{treatySuffix}
Returns detailed information for a specified partitioned treaty.

GET /treaty/:congress/:treatyNumber/:treatySuffix

Example Request

https://api.congress.gov/v3/treaty/114/13/A?api_key=[INSERT_KEY]

Example Response

  {
      "treaty": {
            "actions": {
              "count": 5,
              "url": "https://api.congress.gov/v3/treaty/114/13/A/actions?format=json"
          },
            "congressConsidered": 115,
            "congressReceived": 114,
            "countriesParties": [
                {
                    "name": "Micronesia, Federated States of"
                }
            ]
            "inForceDate": null,
            "indexTerms": [
                {
                   "name": "Maritime"
                },
                {
                   "name": "Micronesia"
                },
                {
                    "name": "Pacific"
                }
            ],
            "number": 13
            "oldNumber": null,
            "oldNumberDisplayName": null,
            "parts": {
              "count": 2,
              "urls": [
                "https://api.congress.gov/v3/treaty/114/13/B?format=json",
                "https://api.congress.gov/v3/treaty/114/13?format=json"
                ]
              },
            "relatedDocs": [],
            "resolutionText": "[115] TreatyRes. 3 for TreatyDoc. 114 - 13A<p><i>As approved by the Senate: </i></p><p></p><p>Resolved, (two-thirds of the Senators present concurring therein),</p><p><b>SECTION 1. SENATE ADVICE AND CONSENT SUBJECT TO A DECLARATION.</b></p><p>The Senate advises and consents to the ratification of the Treaty between the Government of the United States of America and the Government of the Republic of Kiribati on the Delimitation of Maritime Boundaries, signed at Majuro on September 6, 2013 (the "Treaty") (Treaty Doc 114-13B), subject to the declaration in section 2.</p><p><b>SEC. 2. DECLARATION.</b></p><p>The Senate’s advice and consent under section 1 is subject to the following declaration: The Treaty is self-executing.</p><p></p><p></p>",
            "suffix": "A",
            "titles": [
                {
                    "title": "Treaty between the Government of the United States of America and the Government of the Federated States of Micronesia on the Delimitation of a Maritime Boundary, signed at Koror on August 1, 2014.",
                    "titleType": "Treaty - Formal Title"
                },
                {
                    "title": "The Treaty with the Federated States of Micronesia on the Delimitation of a Maritime Boundary",
                    "titleType": "Treaty - Short Title"
                }
            ],
            "transmittedDate": "2016-12-09T00:00:00Z",
            "treatyNum": 13,
            "topic": "Maritime Boundaries and Claims",
            "updateDate": "2022-07-12T15:48:45Z"
          }
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 114.

treatyNumber *
integer
(path)
The treaty’s assigned number. For example, the value can be 13.

treatySuffix *
string
(path)
The treaty’s partition letter value. For example, the value can be A.

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
/treaty/{congress}/{treatyNumber}/actions
Returns the list of actions on a specified treaty.

GET /treaty/:congress/:treatyNumber/actions

Example Request

https://api.congress.gov/v3/treaty/117/3/actions?api_key=[INSERT_KEY]

Example Response

{
    "actions": [
        {
            "actionCode": "S05291",
            "actionDate": "2022-08-03",
            "committee": null,
            "text": "Resolution of advice and consent to ratification agreed to as amended in Senate by Yea-Nay Vote. 95 - 1. Record Vote Number: 282.",
            "type": "Floor"
        },
        {
            "actionCode": "S05311",
            "actionDate": "2022-08-03",
            "committee": null,
            "text": "Treaty moved through its parliamentary stages up to and including presentation of the resolution of advice and consent to ratification.",
            "type": "Floor"
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

treatyNumber *
integer
(path)
The treaty’s assigned number. For example, the value can be 3.

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
/treaty/{congress}/{treatyNumber}/{treatySuffix}/actions
Returns the list of actions on a specified partitioned treaty.

GET /treaty/:congress/:treatyNumber/:treatySuffix/actions

Example Request

https://api.congress.gov/v3/treaty/114/13/A/actions?api_key=[INSERT_KEY]

Example Response

  {
      "actions": [
          {
              "actionCode": "S05291",
              "actionDate": "2018-07-26",
              "committee": null,
              "text": "Resolution of advice and consent to ratification agreed to in Senate by Division Vote.",
              "type": "Floor"
          },
          {
              "actionCode": "S05311",
              "actionDate": "2018-07-26",
              "committee": null,
              "text": "Treaty moved through its parliamentary stages up to and including presentation of the resolution of advice and consent to ratification.",
              "type": "Floor"
          }
      ],
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 114.

treatyNumber *
integer
(path)
The treaty’s assigned number. For example, the value can be 13.

treatySuffix *
string
(path)
The treaty’s partition letter value. For example, the value can be A.

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
/treaty/{congress}/{treatyNumber}/committees
Returns the list of committees associated with a specified treaty.

GET /treaty/:congress/:treatyNumber/committees

Example Request

https://api.congress.gov/v3/treaty/116/3/committees?api_key=[INSERT_KEY]

Example Response

  {
      "treatyCommittees": [
          {
              "activities": [
                {
                  "date": "2020-06-18T20:19:22Z",
                  "name": "Referred to"
                }
              ],
              "chamber": "Senate",
              "name": "Foreign Relations Committee",
              "subcommittees": [],
              "systemCode": "ssfr00",
              "type": "Standing",
              "url": "https://api.congress.gov/v3/committee/senate/ssfr00?format=json"
          }
      ]
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 116.

treatyNumber *
integer
(path)
The treaty’s assigned number. For example, the value can be 3.

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

Legal Visit Congress.gov