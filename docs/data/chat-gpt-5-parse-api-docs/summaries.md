# Summaries

summaries
Returns summaries data from the API


GET
/summaries
Returns a list of summaries sorted by date of last update.

GET /summaries

Example Request

https://api.congress.gov/v3/summaries?fromDateTime=2022-04-01T00:00:00Z&toDateTime=2022-04-03T00:00:00Z&sort=updateDate+asc

Example Response

{
     "summaries": [
        {
            "actionDate": "2021-02-04",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "225",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Competition and Antitrust Law Enforcement Reform Act of 2021",
                "type": "S",
                "updateDateIncludingText": "2022-09-29T03:41:41Z",
                "url": "https://api.congress.gov/v3/bill/117/s/225?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T15:20:50Z",
            "text": " <p><strong>Competition and Antitrust Law Enforcement Reform Act of 2021 </strong></p> <p>This bill revises antitrust laws applicable to mergers and anticompetitive conduct. </p> <p>Specifically, the bill applies a stricter standard for permissible mergers by prohibiting mergers that (1) create an appreciable risk of materially lessening competition, or (2) unfairly lower the prices of goods or wages because of a lack of competition among buyers or employers (i.e., a monopsony). Under current law, mergers that substantially lessen competition are prohibited. </p> <p>Additionally, for some large mergers or mergers that concentrate markets beyond a certain threshold, the bill shifts the burden of proof to the merging parties to prove that the merger does not violate the law. </p> <p>The bill also prohibits exclusionary conduct that presents an appreciable risk of harming competition. </p> <p>The bill also establishes monetary penalties for violations, requires annual reporting for certain mergers and acquisitions, establishes within the Federal Trade Commission (FTC) the Office of the Competition Advocate, and sets forth whistleblower protections. </p> <p>The Government Accountability Office must report on (1) the success of merger remedies required by the Department of Justice or the FTC in recent consent decrees; and (2) the impact of mergers and acquisitions on wages, employment, innovation, and new business formation.</p>",
            "updateDate": "2022-04-01T03:31:17Z",
            "versionCode": "00"
        },
        {
            "actionDate": "2022-03-24",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "3914",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Developing and Empowering our Aspiring Leaders Act of 2022",
                "type": "S",
                "updateDateIncludingText": "2022-09-07T13:35:29Z",
                "url": "https://api.congress.gov/v3/bill/117/s/3914?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T17:52:12Z",
            "text": " <p><strong>Developing and Empowering our Aspiring Leaders Act of 2022 </strong> </p> <p>This bill directs the Securities and Exchange Commission to revise venture capital investment regulations. Venture capital funds are exempt from certain regulations applicable to other investment firms, including those related to filings, audits, and restricted communications with investors. Under current law, non-qualifying investments—which include secondary transactions and investments in other venture capital funds—may comprise up to 20% of a venture capital fund. </p> <p>The bill allows investments acquired through secondary transactions or investments in other venture capital funds to be considered as qualifying investments for venture capital funds. However, for a private fund to qualify as a venture capital fund, the fund's investments must predominately (1) be acquired directly, or (2) be investments in other venture capital funds.</p> <p>",
            "updateDate": "2022-04-01T03:31:16Z",
            "versionCode": "00"
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
/summaries/{congress}
Returns a list of summaries filtered by congress, sorted by date of last update.

GET /summaries/:congress

Example Request

https://api.congress.gov/v3/summaries/117?fromDateTime=2022-04-01T00:00:00Z&toDateTime=2022-04-03T00:00:00Z&sort=updateDate+desc&api_key=[INSERT_KEY]

Example Response

{
     "summaries": [
        {
            "actionDate": "2021-02-04",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "225",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Competition and Antitrust Law Enforcement Reform Act of 2021",
                "type": "S",
                "updateDateIncludingText": "2022-09-29T03:41:41Z",
                "url": "https://api.congress.gov/v3/bill/117/s/225?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T15:20:50Z",
            "text": " <p><strong>Competition and Antitrust Law Enforcement Reform Act of 2021 </strong></p> <p>This bill revises antitrust laws applicable to mergers and anticompetitive conduct. </p> <p>Specifically, the bill applies a stricter standard for permissible mergers by prohibiting mergers that (1) create an appreciable risk of materially lessening competition, or (2) unfairly lower the prices of goods or wages because of a lack of competition among buyers or employers (i.e., a monopsony). Under current law, mergers that substantially lessen competition are prohibited. </p> <p>Additionally, for some large mergers or mergers that concentrate markets beyond a certain threshold, the bill shifts the burden of proof to the merging parties to prove that the merger does not violate the law. </p> <p>The bill also prohibits exclusionary conduct that presents an appreciable risk of harming competition. </p> <p>The bill also establishes monetary penalties for violations, requires annual reporting for certain mergers and acquisitions, establishes within the Federal Trade Commission (FTC) the Office of the Competition Advocate, and sets forth whistleblower protections. </p> <p>The Government Accountability Office must report on (1) the success of merger remedies required by the Department of Justice or the FTC in recent consent decrees; and (2) the impact of mergers and acquisitions on wages, employment, innovation, and new business formation.</p>",
            "updateDate": "2022-04-01T03:31:17Z",
            "versionCode": "00"
        },
        {
            "actionDate": "2022-03-24",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "3914",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Developing and Empowering our Aspiring Leaders Act of 2022",
                "type": "S",
                "updateDateIncludingText": "2022-09-07T13:35:29Z",
                "url": "https://api.congress.gov/v3/bill/117/s/3914?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T17:52:12Z",
            "text": " <p><strong>Developing and Empowering our Aspiring Leaders Act of 2022 </strong> </p> <p>This bill directs the Securities and Exchange Commission to revise venture capital investment regulations. Venture capital funds are exempt from certain regulations applicable to other investment firms, including those related to filings, audits, and restricted communications with investors. Under current law, non-qualifying investments—which include secondary transactions and investments in other venture capital funds—may comprise up to 20% of a venture capital fund. </p> <p>The bill allows investments acquired through secondary transactions or investments in other venture capital funds to be considered as qualifying investments for venture capital funds. However, for a private fund to qualify as a venture capital fund, the fund's investments must predominately (1) be acquired directly, or (2) be investments in other venture capital funds.</p> <p>",
            "updateDate": "2022-04-01T03:31:16Z",
            "versionCode": "00"
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
/summaries/{congress}/{billType}
Returns a list of summaries filtered by congress and by bill type, sorted by date of last update.

GET /summaries/:congress/:billType

Example Request

https://api.congress.gov/v3/summaries/117/hr?fromDateTime=2022-04-01T00:00:00Z&toDateTime=2022-04-03T00:00:00Z&sort=updateDate+desc&api_key=[INSERT_KEY]

Example Response

{
     "summaries": [
        {
            "actionDate": "2021-02-04",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "225",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Competition and Antitrust Law Enforcement Reform Act of 2021",
                "type": "S",
                "updateDateIncludingText": "2022-09-29T03:41:41Z",
                "url": "https://api.congress.gov/v3/bill/117/s/225?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T15:20:50Z",
            "text": " <p><strong>Competition and Antitrust Law Enforcement Reform Act of 2021 </strong></p> <p>This bill revises antitrust laws applicable to mergers and anticompetitive conduct. </p> <p>Specifically, the bill applies a stricter standard for permissible mergers by prohibiting mergers that (1) create an appreciable risk of materially lessening competition, or (2) unfairly lower the prices of goods or wages because of a lack of competition among buyers or employers (i.e., a monopsony). Under current law, mergers that substantially lessen competition are prohibited. </p> <p>Additionally, for some large mergers or mergers that concentrate markets beyond a certain threshold, the bill shifts the burden of proof to the merging parties to prove that the merger does not violate the law. </p> <p>The bill also prohibits exclusionary conduct that presents an appreciable risk of harming competition. </p> <p>The bill also establishes monetary penalties for violations, requires annual reporting for certain mergers and acquisitions, establishes within the Federal Trade Commission (FTC) the Office of the Competition Advocate, and sets forth whistleblower protections. </p> <p>The Government Accountability Office must report on (1) the success of merger remedies required by the Department of Justice or the FTC in recent consent decrees; and (2) the impact of mergers and acquisitions on wages, employment, innovation, and new business formation.</p>",
            "updateDate": "2022-04-01T03:31:17Z",
            "versionCode": "00"
        },
        {
            "actionDate": "2022-03-24",
            "actionDesc": "Introduced in Senate",
            "bill": {
                "congress": 117,
                "number": "3914",
                "originChamber": "Senate",
                "originChamberCode": "S",
                "title": "Developing and Empowering our Aspiring Leaders Act of 2022",
                "type": "S",
                "updateDateIncludingText": "2022-09-07T13:35:29Z",
                "url": "https://api.congress.gov/v3/bill/117/s/3914?format=json"
            },
            "currentChamber": "Senate",
            "currentChamberCode": "S",
            "lastSummaryUpdateDate": "2022-03-31T17:52:12Z",
            "text": " <p><strong>Developing and Empowering our Aspiring Leaders Act of 2022 </strong> </p> <p>This bill directs the Securities and Exchange Commission to revise venture capital investment regulations. Venture capital funds are exempt from certain regulations applicable to other investment firms, including those related to filings, audits, and restricted communications with investors. Under current law, non-qualifying investments—which include secondary transactions and investments in other venture capital funds—may comprise up to 20% of a venture capital fund. </p> <p>The bill allows investments acquired through secondary transactions or investments in other venture capital funds to be considered as qualifying investments for venture capital funds. However, for a private fund to qualify as a venture capital fund, the fund's investments must predominately (1) be acquired directly, or (2) be investments in other venture capital funds.</p> <p>",
            "updateDate": "2022-04-01T03:31:16Z",
            "versionCode": "00"
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

congress
Returns congress and congressional sessions data from the API


GET
/congress
Returns a list of congresses and congressional sessions.

GET /congress

Example Request

https://api.congress.gov/v3/congress?api_ke[INSERT_KEY]

Example Response

{
     "congresses": [
        {
            "endYear": "2022",
            "name": "117th Congress",
            "sessions": [
                {
                    "chamber": "House of Representatives",
                    "endDate": "2022-01-03",
                    "number": 1,
                    "startDate": "2021-01-03",
                    "type": "R"
                },
                {
                    "chamber": "Senate",
                    "endDate": "2022-01-03",
                    "number": 1,
                    "startDate": "2021-01-03",
                    "type": "R"
                },
                {
                    "chamber": "House of Representatives",
                    "endDate": null,
                    "number": 2,
                    "startDate": "2022-01-03",
                    "type": "R"
                },
                {
                    "chamber": "Senate",
                    "endDate": null,
                    "number": 2,
                    "startDate": "2022-01-03",
                    "type": "R"
                }
            ],
            "startYear": "2021"
        },
        {
            "endYear": "2020",
            "name": "116th Congress",
            "sessions": [
                {
                    "chamber": "House of Representatives",
                    "endDate": "2020-01-03",
                    "number": 1,
                    "startDate": "2019-01-03",
                    "type": "R"
                },
                {
                    "chamber": "Senate",
                    "endDate": "2020-01-03",
                    "number": 1,
                    "startDate": "2019-01-03",
                    "type": "R"
                },
                {
                    "chamber": "House of Representatives",
                    "endDate": "2021-01-03",
                    "number": 2,
                    "startDate": "2020-01-03",
                    "type": "R"
                },
                {
                    "chamber": "Senate",
                    "endDate": "2021-01-03",
                    "number": 2,
                    "startDate": "2020-01-03",
                    "type": "R"
                }
            ],
            "startYear": "2019"
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
/congress/{congress}
Returns detailed information for a specified congress.

GET /congress/:congress

Example Request

https://api.congress.gov/v3/congress/116?api_key=[INSERT_KEY]

Example Response

{
  "congress": {
      "endYear": "2020",
      "name": "116th Congress",
      "number": 116,
      "sessions": [
          {
              "chamber": "House of Representatives",
              "endDate": "2020-01-03",
              "number": 1,
              "startDate": "2019-01-03",
              "type": "R"
          },
          {
              "chamber": "Senate",
              "endDate": "2020-01-03",
              "number": 1,
              "startDate": "2019-01-03",
              "type": "R"
          },
          {
              "chamber": "House of Representatives",
              "endDate": "2021-01-03",
              "number": 2,
              "startDate": "2020-01-03",
              "type": "R"
          },
          {
              "chamber": "Senate",
              "endDate": "2021-01-03",
              "number": 2,
              "startDate": "2020-01-03",
              "type": "R"
          }
      ],
      "startYear": "2019",
      "updateDate": "2019-01-03T18:37:12Z",
      "url": "https://api.congress.gov/v3/congress/116?format=json"
  },
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/congress/current
Returns detailed information for the current congress.

GET /congress/current

Example Request

https://api.congress.gov/v3/congress/current?api_key=[INSERT_KEY]

Example Response

{
  "congress": {
      "endYear": "2024",
      "name": "118th Congress",
      "number": 118,
      "sessions": [
          {
              "chamber": "House of Representatives",
              "endDate": "2024-01-03",
              "number": 1,
              "startDate": "2023-01-03",
              "type": "R"
          },
          {
               "chamber": "Senate",
               "endDate": "2024-01-03",
               "number": 1,
               "startDate": "2023-01-03",
               "type": "R"
          },
          {
               "chamber": "Senate",
               "number": 2,
               "startDate": "2024-01-03",
               "type": "R"
          },
          {
               "chamber": "House of Representatives",
               "number": 2,
               "startDate": "2024-01-03",
               "type": "R"
          }
      ],
      "startYear": "2023",
      "updateDate": "2023-01-03T17:43:32Z",
      "url": "https://api.congress.gov/v3/congress/current?format=json"
  },
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