# Committee Report

committee-report
Returns committee report data from the API


GET
/committee-report
Returns a list of committee reports.

GET /committee-report

Example Request

https://api.congress.gov/v3/committee-report?api_key=[INSERT_KEY]

Example Response

{
      "reports": [
        {
            "chamber": "House",
            "citation": "H. Rept. 117-397,Part 2",
            "congress": 117,
            "number": 397,
            "part": 2,
            "type": "HRPT",
            "updateDate": "2022-09-29 03:27:29+00:00",
            "url": "https://api.congress.gov/v3/committee-report/117/HRPT/397?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 117-397",
            "congress": 117,
            "number": 397,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-09-29 03:27:29+00:00",
            "url": "https://api.congress.gov/v3/committee-report/117/HRPT/397?format=json"
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

conference
string
(query)
Flag to indicate conference reports. Value can be true or false.

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
/committee-report/{congress}
Returns a list of committee reports filtered by the specified congress.

GET /committee-report/:congress

Example Request

https://api.congress.gov/v3/committee-report/116?conference=true&api_key=[INSERT_KEY]

Example Response

{
    "reports": [
        {
            "chamber": "House",
            "citation": "H. Rept. 116-617",
            "congress": 116,
            "number": 617,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/617?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 116-333",
            "congress": 116,
            "number": 333,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/333?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 116-9",
            "congress": 116,
            "number": 9,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/9?format=json"
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

format
string
(query)
The data format. Value can be xml or json.

conference
string
(query)
Flag to indicate conference reports. Value can be true or false.

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
/committee-report/{congress}/{reportType}
Returns a list of committee reports filtered by the specified congress and report type.

GET /committee-report

Example Request

https://api.congress.gov/v3/committee-report/116/hrpt?conference=true&api_key=[INSERT_KEY]

Example Response

{
    "reports": [
        {
            "chamber": "House",
            "citation": "H. Rept. 116-617",
            "congress": 116,
            "number": 617,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/617?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 116-333",
            "congress": 116,
            "number": 333,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/333?format=json"
        },
        {
            "chamber": "House",
            "citation": "H. Rept. 116-9",
            "congress": 116,
            "number": 9,
            "part": 1,
            "type": "HRPT",
            "updateDate": "2022-05-20 16:27:57+00:00",
            "url": "https://api.congress.gov/v3/committee-report/116/HRPT/9?format=json"
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

reportType *
string
(path)
The type of committee report. Value can be hrpt, srpt, or erpt.

format
string
(query)
The data format. Value can be xml or json.

conference
string
(query)
Flag to indicate conference reports. Value can be true or false.

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
/committee-report/{congress}/{reportType}/{reportNumber}
Returns detailed information for a specified committee report.

GET /committee-report/:congress/:reportType/:reportNumber

Example Request

https://api.congress.gov/v3/committee-report/116/HRPT/617?api_key=[INSERT_KEY]

Example Response

{
    "committeeReports": [
        {
            "associatedBill": [
                {
                    "congress": 116,
                    "number": "6395",
                    "type": "HR",
                    "url": "https://api.congress.gov/v3/bill/116/hr/6395?format=json"
                }
            ],
            "chamber": "House",
            "citation": "H. Rept. 116-617",
            "congress": 116,
            "isConferenceReport": true,
            "issueDate": "2020-12-03T05:00:00Z",
            "number": 617,
            "part": 1,
            "reportType": "H.Rept.",
            "sessionNumber": 2,
            "text": {
              "count": 2,
              "url": https://api.congress.gov/v3/committee-report/116/hrpt/617/text?format=json"
            },
            "title": "WILLIAM M. (MAC) THORNBERRY NATIONAL DEFENSE AUTHORIZATION ACT FOR FISCAL YEAR 2021",
            "type": "HRPT",
            "updateDate": "2022-05-20T16:27:57Z"
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

reportType *
string
(path)
The type of committee report. Value can be hrpt, srpt, or erpt.

reportNumber *
integer
(path)
The committee report’s assigned number. For example, the value can be 617.

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
/committee-report/{congress}/{reportType}/{reportNumber}/text
Returns the list of texts for a specified committee report.

GET /committee-report/:congress/:reportType/:reportNumber/:text

Example Request

https://api.congress.gov/v3/committee-report/116/hrpt/617/text?api_key=[INSERT_KEY]

Example Response

{
    "text": [
        {
            "formats": [
                {
                    "isErrata": "N",
                    "type": "Formatted Text",
                    "url": "https://www.congress.gov/116/crpt/hrpt617/generated/CRPT-116hrpt617.htm"
                }
            ]
        },
        {
            "formats": [
                {
                    "isErrata": "N",
                    "type": "PDF",
                    "url": "https://www.congress.gov/116/crpt/hrpt617/CRPT-116hrpt617.pdf"
                }
            ]
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

reportType *
string
(path)
The type of committee report. Value can be hrpt, srpt, or erpt.

reportNumber *
integer
(path)
The committee report’s assigned number. For example, the value can be 617.

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

committee-print
Returns committee print data from the API


GET
/committee-print
Returns a list of committee prints.

GET /committee-print

Example Request

https://api.congress.gov/v3/committee-print?api_key=[INSERT_KEY]

Example Response

  {
      "committeePrints": [
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48144,
              "updateDate": "2022-08-01 21:19:33+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48144?format=json"
          },
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48031,
              "updateDate": "2022-10-19 21:15:20+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48031?format=json"
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
/committee-print/{congress}
Returns a list of committee prints filtered by the specified congress.

GET /committee-print/:congress

Example Request

https://api.congress.gov/v3/committee-print/117?api_key=[INSERT_KEY]

Example Response

  {
      "committeePrints": [
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48144,
              "updateDate": "2022-08-01 21:19:33+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48144?format=json"
          },
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48031,
              "updateDate": "2022-10-19 21:15:20+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48031?format=json"
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
/committee-print/{congress}/{chamber}
Returns a list of committee prints filtered by the specified congress and chamber.

GET /committee-print/:congress/:chamber

Example Request

https://api.congress.gov/v3/committee-print/117/house?api_key=[INSERT_KEY]

Example Response

  {
      "committeePrints": [
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48144,
              "updateDate": "2022-08-01 21:19:33+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48144?format=json"
          },
          {
              "chamber": "House",
              "congress": 117,
              "jacketNumber": 48031,
              "updateDate": "2022-10-19 21:15:20+00:00",
              "url": "https://api.congress.gov/v3/committee-print/117/house/48031?format=json"
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
The chamber name. Value can be house, senate, or nochamber.

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
/committee-print/{congress}/{chamber}/{jacketNumber}
Returns detailed information for a specified committee print.

GET /committee-print/:congress/:chamber/:jacketNumber

Example Request

https://api.congress.gov/v3/committee-print/117/house/48144?api_key=[INSERT_KEY]

Example Response

{
    "committeePrint": [
        {
            "associatedBills": [
                {
                    "congress": 117,
                    "number": "5768",
                    "type": "HR",
                    "url": "https://api.congress.gov/v3/bill/117/hr/5768?format=json"
                }
            ],
            "chamber": "House",
            "citation": "117-62",
            "committees": [
                {
                    "name": "Rules Committee",
                    "systemCode": "hsru00",
                    "url": "https://api.congress.gov/v3/committee/house/hsru00?format=json"
                }
            ],
            "congress": 117,
            "jacketNumber": 48144,
            "number": "62",
            "text": {
                "count": 4,
                "url": "https://api.congress.gov/v3/committee-print/117/house/48144/text?format=json"
            },
            "title": "RULES COMMITTEE PRINT 117-62 TEXT OF H.R. 5768, VIOLENT INCIDENT CLEAR- ANCE AND TECHNOLOGICAL INVESTIGATIVE METHODS ACT OF 2022",
            "updateDate": "2022-08-01 21:19:33+00:00"
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

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

jacketNumber *
integer
(path)
The jacket number for the print. For example, the value can be 48144.

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
/committee-print/{congress}/{chamber}/{jacketNumber}/text
Returns the list of texts for a specified committee print.

GET /committee-print/:congress/:chamber/:jacketNumber/text

Example Request

https://api.congress.gov/v3/committee-print/117/house/48144/text?api_key=[INSERT_KEY]

Example Response

  {
      "text": [
          {
              "type": "Formatted Text",
              "url": "https://www.congress.gov/117/cprt/HPRT48144/CPRT-117HPRT48144.htm"
          },
          {
              "type": "PDF",
              "url": "https://www.congress.gov/117/cprt/HPRT48144/CPRT-117HPRT48144.pdf"
          },
          {
              "type": "Formatted XML",
              "url": "https://www.congress.gov/117/cprt/HPRT48144/CPRT-117HPRT48144.xml"
          },
          {
              "type": "Generated HTML",
              "url": "https://www.congress.gov/117/cprt/HPRT48144/CPRT-117HPRT48144_gen.htm"
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

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

jacketNumber *
integer
(path)
The jacket number for the print. For example, the value can be 48144.

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

committee-meeting
Returns committee meeting data from the API


GET
/committee-meeting
Returns a list of committee meetings.

GET /committee-meeting

Example Request

https://api.congress.gov/v3/committee-meeting?api_key=[INSERT_KEY]

Example Response

  {
      "committeeMeetings": [
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115522",
              "updateDate": "2023-10-01T04:18:34Z",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115522?format=json"
          },
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115538",
              "updateDate": "2024-12-02T04:44:57Z",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115538?format=json"
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
/committee-meeting/{congress}
Returns a list of committee meetings filtered by the specified congress.

GET /committee-meeting/{congress}

Example Request

https://api.congress.gov/v3/committee-meeting/118?api_key=[INSERT_KEY]

Example Response

  {
      "committeeMeetings": [
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115522",
              "updateDate": "2023-10-01T04:18:34Z",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115522?format=json"
          },
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115538",
              "updateDate": "2024-12-02T04:44:57Z ",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115538?format=json"
          },
      ]
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 118.

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
/committee-meeting/{congress}/{chamber}
Returns a list of committee meetings filtered by the specified congress and chamber.

GET /committee-meeting/{congress}/{chamber}

Example Request

https://api.congress.gov/v3/committee-meeting/118/house?api_key=[INSERT_KEY]

Example Response

  {
      "committeeMeetings": [
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115522",
              "updateDate": "2023-10-01T04:18:34Z",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115522?format=json"
          },
          {
              "chamber": "House",
              "congress": 118,
              "eventId": "115538",
              "updateDate": "2024-12-02T04:44:57Z",
              "url": "https://api.congress.gov/v3/committee-meeting/118/house/115538?format=json"
          },
      ]
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 118.

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

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
/committee-meeting/{congress}/{chamber}/{eventId}
Returns detailed information for a specified committee meeting.

GET /committee-meeting/{congress}/{chamber}/{eventId}

Example Request

https://api.congress.gov/v3/committee-meeting/118/house/115538?api_key=[INSERT_KEY]

Example Response

  {
      "committeeMeeting": {
          "chamber": "House",
          "committees": [
              {
                  "name": "House Natural Resources Subcommittee on Indian and Insular Affairs",
                  "systemCode": "hsii24",
                  "url": "https://api.congress.gov/v3/committee/house/hsii24?format=json"
              }
          ],
          "congress": 118,
          "date": "2024-12-02T04:44:57Z",
          "eventId": "115538",
          "hearingTranscript": [],
          "location": {
              "building": "Longworth House Office Building",
              "room": "1324"
          },
          "meetingDocuments": [
              {
                  "description": null,
                  "documentType": "Support Document",
                  "format": "PDF",
                  "name": "Hearing Notice",
                  "url": "https://www.congress.gov/118/meeting/house/115538/documents/HHRG-118-II24-20230324-SD001.pdf"
              },
              {
                  "description": null,
                  "documentType": "Bills and Resolutions",
                  "format": "PDF",
                  "name": "H.R. 1532 (Rep. Hageman), To authorize any Indian Tribe to lease, sell, convey, warrant, or otherwise transfer real property to which that Indian Tribe holds fee title without the consent of the Federal Government, and for other purposes.",
                  "url": "https://www.congress.gov/118/meeting/house/115538/documents/BILLS-118HR1532ih.pdf"
              },
              {
                  "description": null,
                  "documentType": "Bills and Resolutions",
                  "format": "PDF",
                  "name": "H.R. 1246 (Rep. Hageman), To authorize leases of up to 99 years for land held in trust for federally recognized Indian tribes.",
                  "url": "https://www.congress.gov/118/meeting/house/115538/documents/BILLS-118HR1246ih.pdf"
              },
              {
                  "description": null,
                  "documentType": "Support Document",
                  "format": "PDF",
                  "name": "Hearing Memo",
                  "url": "https://www.congress.gov/118/meeting/house/115538/documents/HHRG-118-II24-20230324-SD002.pdf"
              },
              {
                  "description": null,
                  "documentType": "Support Document",
                  "format": "PDF",
                  "name": "Chair Westerman's Submission FTR - Pueblo of Santa Clara Statement by Governor Chavarria",
                  "url": "https://www.congress.gov/118/meeting/house/115538/documents/HHRG-118-II24-20230324-SD003.pdf"
              }
          ],
          "meetingStatus": "Scheduled",
          "relatedItems": {
              "bills": [
                  {
                      "congress": 118,
                      "number": "1532",
                      "type": "HR",
                      "url": "https://api.congress.gov/v3/bill/118/hr/1532?format=json"
                  },
                  {
                      "congress": 118,
                      "number": "1246",
                      "type": "HR",
                      "url": "https://api.congress.gov/v3/bill/118/hr/1246?format=json"
                  }
              ],
              "nominations": [],
              "treaties": []
          },
          "title": "Legislative hearing on: \u2022\tH.R. 1246 (Rep. Hageman), To authorize leases of up to 99 years for land held in trust for federally recognized Indian tribes; and\r\n\u2022\tH.R. 1532 (Rep. Hageman), To authorize any Indian Tribe to lease, sell, convey, warrant, or otherwise transfer real property to which that Indian Tribe holds fee title without the consent of the Federal Government, and for other purposes.",
          "type": "Hearing",
          "updateDate": "2024-12-02T04:44:57Z",
          "videos": [],
          "witnessDocuments": [
              {
                  "documentType": "Witness Statement",
                  "format": "PDF",
                  "url": "https://www.congress.gov/118/meeting/house/115538/witnesses/HHRG-118-II24-Wstate-OsceolaM-20230324.pdf"
              },
              {
                  "documentType": "Witness Statement",
                  "format": "PDF",
                  "url": "https://www.congress.gov/118/meeting/house/115538/witnesses/HHRG-118-II24-Wstate-WilliamsJ-20230324.pdf"
              },
              {
                  "documentType": "Witness Statement",
                  "format": "PDF",
                  "url": "https://www.congress.gov/118/meeting/house/115538/witnesses/HHRG-118-II24-Wstate-NewlandB-20230324.pdf"
              }
          ],
          "witnesses": [
              {
                  "name": "The Honorable Bryan Newland",
                  "organization": "Bureau of Indian Affairs",
                  "position": "Assistant Secretary"
              },
              {
                  "name": "The Honorable Marcellus Osceola",
                  "organization": "Seminole Tribe of Florida",
                  "position": "Chairman"
              },
              {
                  "name": "The Honorable John Williams",
                  "organization": "United Auburn Rancheria",
                  "position": "Vice Chairman"
              }
          ]
      },
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 118.

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

eventId *
string
(path)
The event identifier. For example, the value can be 115538.

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

hearing
Returns hearing data from the API


GET
/hearing
Returns a list of hearings.

GET /hearing

Example Request

https://api.congress.gov/v3/hearing?api_key=[INSERT_KEY]

Example Response

  {
      "hearings": [
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41444,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41444?format=json"
          },
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41365,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41365?format=json"
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/hearing/{congress}
Returns a list of hearings filtered by the specified congress.

GET /hearing/:congress

Example Request

https://api.congress.gov/v3/hearing/116?api_key=[INSERT_KEY]

Example Response

  {
      "hearings": [
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41444,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41444?format=json"
          },
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41365,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41365?format=json"
          },
      ]
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 116.

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
/hearing/{congress}/{chamber}
Returns a list of hearings filtered by the specified congress and chamber.

GET /hearing/:congress/:chamber

Example Request

https://api.congress.gov/v3/hearing/116/house?api_key=[INSERT_KEY]

Example Response

  {
      "hearings": [
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41444,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41444?format=json"
          },
          {
              "chamber": "House",
              "congress": 116,
              "jacketNumber": 41365,
              "updateDate": "2022-06-30 03:50:43+00:00",
              "url": "https://api.congress.gov/v3/hearing/117/house/41365?format=json"
          },
      ]
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 116.

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

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
/hearing/{congress}/{chamber}/{jacketNumber}
Returns detailed information for a specified hearing.

GET /hearing/:congress/:chamber/:jacketNumber

Example Request

https://api.congress.gov/v3/hearing/116/house/41365?api_key=[INSERT_KEY]

Example Response

  {
      "hearing": {
          "associatedMeeting": {
              "eventId": "110484"
              "url": "http://api.congress.gov/v3/committee-meeting/116/house/110484?format=xml"
          },
          "chamber": "House",
          "citation": "H.Hrg.116",
          "committees": [
              {
                  "name": "House Agriculture Committee",
                  "systemCode": "hsag00",
                  "url": "https://api.congress.gov/v3/committee/house/hsag00?format=json"
              }
          ],
          "congress": 116,
          "dates": [
              {
                  "date": "2020-02-11"
              }
          ],
          "formats": [
              {
                  "type": "Formatted Text",
                  "url": "https://www.congress.gov/116/chrg/CHRG-116hhrg41365/CHRG-116hhrg41365.htm"
              },
              {
                  "type": "PDF",
                  "url": "https://www.congress.gov/116/chrg/CHRG-116hhrg41365/CHRG-116hhrg41365.pdf"
              }
          ],
          "jacketNumber": 41365,
          "libraryOfCongressIdentifier": "LC65344",
          "title": "ECONOMIC OPPORTUNITIES FROM LOCAL AGRICULTURAL MARKETS",
          "updateDate": "2022-06-30 03:50:43+00:00"
      },
  }
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 116.

chamber *
string
(path)
The chamber name. Value can be house, senate, or nochamber.

jacketNumber *
integer
(path)
The jacket number for the hearing. For example, the value can be 41365.

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