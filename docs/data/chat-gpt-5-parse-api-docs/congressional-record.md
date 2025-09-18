# Congressional Record

congressional-record
Returns Congressional Record data from the API


GET
/congressional-record
Returns a list of congressional record issues sorted by most recent.

GET /congressional-record/?y=:year&m=:month&d=:day

Example Request

https://api.congress.gov/v3/congressional-record/?y=2022&m=6&d=28&api_key=[INSERT_KEY]

Example Response

{
    "Results": {
        "IndexStart": 1,
        "Issues": [
            {
                "Congress": "117",
                "Id": 26958,
                "Issue": "109",
                "Links": {
                    "Digest": {
                        "Label": "Daily Digest",
                        "Ordinal": 1,
                        "PDF": [
                            {
                                "Part": "1",
                                "Url": "https://www.congress.gov/117/crec/2022/06/28/168/109/CREC-2022-06-28-dailydigest.pdf"
                            }
                        ]
                    },
                    "FullRecord": {
                        "Label": "Entire Issue",
                        "Ordinal": 5,
                        "PDF": [
                            {
                                "Part": "1",
                                "Url": "https://www.congress.gov/117/crec/2022/06/28/168/109/CREC-2022-06-28.pdf"
                            }
                        ]
                    },
                    "House": {
                        "Label": "House Section",
                        "Ordinal": 3,
                        "PDF": [
                            {
                                "Part": "1",
                                "Url": "https://www.congress.gov/117/crec/2022/06/28/168/109/CREC-2022-06-28-house.pdf"
                            }
                        ]
                    },
                    "Remarks": {
                        "Label": "Extensions of Remarks Section",
                        "Ordinal": 4,
                        "PDF": [
                            {
                                "Part": "1",
                                "Url": "https://www.congress.gov/117/crec/2022/06/28/168/109/CREC-2022-06-28-extensions.pdf"
                            }
                        ]
                    },
                    "Senate": {
                        "Label": "Senate Section",
                        "Ordinal": 2,
                        "PDF": [
                            {
                                "Part": "1",
                                "Url": "https://www.congress.gov/117/crec/2022/06/28/168/109/CREC-2022-06-28-senate.pdf"
                            }
                        ]
                    }
                },
                "PublishDate": "2022-06-28",
                "Session": "2",
                "Volume": "168"
            },
        ],
   }
}
Parameters
Try it out
Name	Description
format
string
(query)
The data format. Value can be xml or json.

y
integer
(query)
The year the issue was published. For example, the value can be 2022.

m
integer
(query)
The month the issue was published. For example, the value can be 6.

d
integer
(query)
The day the issue was published. For example, the value can be 28.

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

daily-congressional-record
Returns daily Congressional Record data from the API


GET
/daily-congressional-record
Returns a list of daily congressional record issues sorted by most recent.

GET /daily-congressional-record

Example Request

https://api.congress.gov/v3/daily-congressional-record?api_key=[INSERT_KEY]

Example Response

{
    "dailyCongressionalRecord": [
        {
            "congress": "118",
            "issueDate": "2023-07-11T04:00:00Z",
            "issueNumber": "118",
            "sessionNumber": "1",
            "updateDate": "2023-07-12T11:30:30Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/169/118?format=json",
            "volumeNumber": "169"

            },
            "congress": "118",
            "issueDate": "2023-07-07T04:00:00Z",
            "issueNumber": "117",
            "sessionNumber": "1",
            "updateDate": "2023-07-12T11:00:30Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/169/117?format=json",
            "volumeNumber": "169"
        },
        {
            "congress": "118",
            "issueDate": "2023-07-06T04:00:00Z",
            "issueNumber": "116",
            "sessionNumber": "1",
            "updateDate": "2023-07-07T21:03:48Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/169/116?format=json",
            "volumeNumber": "169"
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
/daily-congressional-record/{volumeNumber}
Returns a list of daily Congressional Records filtered by the specified volume number.

GET /daily-congressional-record/:volumeNumber

Example Request

https://api.congress.gov/v3/daily-congressional-record/166?api_key=[INSERT_KEY]

Example Response

{
    "dailyCongressionalRecord": [
        {
            "congress": "116",
            "issueDate": "2021-01-03T05:00:00Z",
            "issueNumber": "225",
            "sessionNumber": "2",
            "updateDate": "2021-01-04T11:15:10Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/166/225?format=json",
            "volumeNumber": "166"
        },
        {
            "congress": "116",
            "issueDate": "2021-01-01T05:00:00Z",
            "issueNumber": "224",
            "sessionNumber": "2",
            "updateDate": "2021-01-03T15:45:11Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/166/224?format=json",
            "volumeNumber": "166"
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

volumeNumber *
string
(path)
The specified volume of the daily Congressional record, for example 166.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/daily-congressional-record/{volumeNumber}/{issueNumber}
Returns a list of daily Congressional Records filtered by the specified volume number and specified issue number.

GET /daily-congressional-record/:volumeNumber/:issueNumber

Example Request

https://api.congress.gov/v3/daily-congressional-record/168/153?api_key=[INSERT_KEY]

Example Response

{
    "issue": [
        {
            "congress": "117",
            "fullIssue": "2021-01-03T05:00:00Z",
                "articles": {
                    "count": 256,
                    "url": "http://api.congress.gov/v3/daily-congressional-record/168/153/articles?format=json",
                },
                "entireIssue": [
                    {
                        "part": "1",
                        "type": "Formatted Text",
                        "url": "https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22-pt1-PgD1015.htm"
                    },
                    {
                       "part": "1",
                       "type": "PDF",
                       "url": "https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22.pdf"
                    }
                  ],
                  "sections": [
                      {
                        "endPage": "D1020",
                        "name": "Daily Digest",
                        "startPage": "D1015",
                        "text": [
                            {
                                "type": "PDF",
                                "url": "https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22-dailydigest.pdf"
                            },
                            {
                                "type": "Formatted Text",
                                "url": "https://congress.gov/117/crec/2022/09/22d22se2-1.htm"
                            }
                        ]
                      },
                      {
                        "endPage": "E976",
                        "name": "Extension of Remarks Section",
                        "startPage": "E965",
                        "text": [
                            {
                                "part": "1",
                                "type": "PDF",
                                "url": "https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22-extensions.pdf"
                            }
                        ]
                      }
                      {
                         "endPage": "E976",
                         "name": "House Section",
                         "startPage": "H8069",
                         "text": [
                            {
                                "part": "1",
                                "type": "PDF",
                                "url": https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22-house.pdf
                            }
                         ]
                      }
                      {
                         "endPage": "E976",
                         "name": "Senate Section",
                         "startPage": "S4941",
                         "text": [
                            {
                                "part": "1",
                                "type": "PDF",
                                "url": https://congress.gov/117/crec/2022/09/22/168/153/CREC-2022-09-22-senate.pdf
                            }
                         ]
                      }
                  ]
                }
              ]
            },
            "issueDate": "2022-09-22T04:00:00Z",
            "issueNumber": "153",
            "sessionNumber": 2,
            "updateDate": "2022-09-23T12:00:14Z",
            "url": "http://api.congress.gov/v3/daily-congressional-record/168/153?format=json",
            "volumeNumber": 168
     },
        "request": {
        "contentType": "application/json",
        "format": "json",
        "issueNumber": "153",
        "volumeNumber": "168"
      }
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

volumeNumber *
string
(path)
The specified volume of the daily Congressional record, for example 166.

issueNumber *
string
(path)
The specified issue of the daily Congressional record, for example 153.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/daily-congressional-record/{volumeNumber}/{issueNumber}/articles
Returns a list of daily Congressional Record articles filtered by the specified volume number and specified issue number.

GET /daily-congressional-record/:volumeNumber/:issueNumber/articles

Example Request

https://api.congress.gov/v3/daily-congressional-record/167/21/articles?api_key=[INSERT_KEY]

Example Response

{
    "articles": [
        {
           "name": "Daily Digest",
           "sectionArticles": [
               {
                 "endPage": "D94",
                 "startPage": "D93",
                 "text": [
                     {
                         "type": "Formatted Text",
                         "url": "https://congress.gov/117/crec/2021/02/04/167/21/modified/CREC-2021-02-04-pt1-PgD93-3.htm"
                      },
                      {
                         "type": "PDF",
                         "url": "https://congress.gov/117/crec/2021/02/04/167/21/CREC-2021-02-04-pt1-PgD93-3.pdf"
                      },
                      {
                         "type": "Formatted Text",
                         "url": "https://congress.gov/117/crec/2021/02/04/modified/CREC-2021-02-04-pt2-PgD93-3.htm"
                      },
                      {
                         "type": "PDF",
                         "url": "https://congress.gov/117/crec/2021/02/04/CREC-2021-02-04-pt2-PgD93-3.pdf"
                      }
                  ],
                  "title": "Daily Digest/Next Meeting of the SENATE + Next Meeting of the HOUSE OF REPRESENTATIVES + Other End Matter; Congressional Record Vol. 167, No. 21"
},
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

volumeNumber *
string
(path)
The specified volume of the daily Congressional record, for example 166.

issueNumber *
string
(path)
The specified issue of the daily Congressional record, for example 153.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

bound-congressional-record
Returns bound Congressional Record data from the API


GET
/bound-congressional-record
Returns a list of bound Congressional Records sorted by most recent.

GET /bound-congressional-record

Example Request

https://api.congress.gov/v3/bound-congressional-record?api_key=[INSERT_KEY]

Example Response

  "boundCongressionalRecord": [
          {
          "congress": "109",
          "date": "2005-06-20",
          "sessionNumber": "1",
          "updateDate": "2020-04-08",
          "url": "http://api.congress.gov/v3/bound-congressional-record/2005/6/20?format=json",
          "volumeNumber": "151"
          },
          {
          "congress": "106",
          "date": "1999-07-01",
          "sessionNumber": "1",
          "updateDate": "2020-04-08",
          "url": "http://api.congress.gov/v3/bound-congressional-record/1999/7/1?format=json",
          "volumeNumber": "145"
           },
  ],
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
/bound-congressional-record/{year}
Returns a list of bound Congressional Records filtered by the specified year.

GET /bound-congressional-record/:year
Example Request

https://api.congress.gov/v3/bound-congressional-record/1990?api_key=[INSERT_KEY]

Example Response

{
    "boundCongressionalRecord": [
        {
            "congress": "101",
            "date": "1990-02-28",
            "sessionNumber": "2",
            "updateDate": "2020-10-20",
            "url": "http://api.congress.gov/v3/bound-congressional-record/1990/2/28?format=json",
            "volumeNumber": "136"
        },
        {
            "congress": "101",
            "issueDate": "1990-03-19",
            "sessionNumber": "2",
            "updateDate": "2020-10-20",
            "url": "http://api.congress.gov/v3/bound-congressional-record/1990/3/19?format=json",
            "volumeNumber": "136"
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

year *
string
(path)
The specified year of the bound Congressional record, for example 1990.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bound-congressional-record/{year}/{month}
Returns a list of bound Congressional Records filtered by the specified year and specified month.

GET /bound-congressional-record/:year/:month/:day

Example Request

https://api.congress.gov/v3/bound-congressional-record/1990/5?api_key=[INSERT_KEY]

Example Response

{
   "boundCongressionalRecord": [
       {
           "congress": 101,
            "date": "1990-05-01",
            "sessionNumber": 2,
            "updateDate": "2020-10-20",
            "url": "http://api.congress.gov/v3/bound-congressional-record/1990/5/1?format=json",
            "volumeNumber": 136
        },
        {
           "congress": 101,
           "date": "1990-05-01",
           "sessionNumber": 2,
           "updateDate": "2020-10-20",
           "url": "http://api.congress.gov/v3/bound-congressional-record/1990/5/1?format=json",
            "volumeNumber": 136
        },
        {
            "congress": 101,
            "date": "1990-05-01",
            "sessionNumber": 2,
            "updateDate": "2020-10-20",
            "url": "http://api.congress.gov/v3/bound-congressional-record/1990/5/1?format=json",
            "volumeNumber": 136
        },
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

year *
string
(path)
The specified year of the bound Congressional record, for example 1990.

month *
string
(path)
The specified month of the bound Congressional record, for example 4 for April.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/bound-congressional-record/{year}/{month}/{day}
Returns a list of bound Congressional Records filtered by the specified year, specified month and specified day.

GET /bound-congressional-record/:year/:month/:day

Example Request

https://api.congress.gov/v3/bound-congressional-record/1948/05/19?api_key=[INSERT_KEY]

Example Response

{
   "boundCongressionalRecord": [
       {
          "congress": 80,
          "date": "1948-05-19",
          "sections": [
              {
              "endPage": 6155,
              "name": "House of Representatives",
              "startPage": 6099
        }
        ],
          "sessionNumber": 2,
          "updateDate": "2023-04-27",
          "volumeNumber": 94
        },
        {
          "congress": 80,
          "date": "1948-05-19",
          "sections": [
              {
              "endPage": 6098,
              "name": "Senate",
              "startPage": 6051
        }
        ],
          "sessionNumber": 2,
          "updateDate": "2023-04-27",
          "volumeNumber": 94
        },
        {
          "congress": 80,
          "date": "1948-05-19",
          "sections": [
              {
              "endPage": 6155,
              "name": "Entire Issue",
              "startPage": 6051
        }
        ],
          "sessionNumber": 2,
          "updateDate": "2023-04-27",
          "volumeNumber": 94
        },
        {
          "congress": 80,
          "dailyDigest": {
                    "endPage": 365,
                    "startPage": 362,
                    "text": [
                        {
                            "type": "PDF",
                            "url": "http://congress.gov/crecb/1948/GPO-CRECB-1948-pt14-Pages362-365.pdf"
                        }
                    ]
            },
            "date": "1948-05-19",
            "sections": [
                {
                    "endPage": 365,
                    "name": "Daily Digest",
                    "startPage": 362
                }
            ],
            "sessionNumber": 2,
            "updateDate": "2022-11-04",
            "volumeNumber": 94
            }
            ],
            "pagination": {
                "count": 4
            },
            {
            "request": {
            "contentType": "application/json",
            "day": "19",
            "format": "json",
            "month": "05",
            "year": "1948"
           },
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

year *
string
(path)
The specified year of the bound Congressional record, for example 1990.

month *
string
(path)
The specified month of the bound Congressional record, for example 4 for April.

day *
string
(path)
The specified day of the bound Congressional record, for example 18.

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value