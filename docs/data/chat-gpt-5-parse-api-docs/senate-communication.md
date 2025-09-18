# Senate Communication

senate-communication
Returns Senate communication data from the API


GET
/senate-communication
Returns a list of Senate communications.

GET /senate-communication

Example Request

https://api.congress.gov/v3/senate-communication?api_key=[INSERT_KEY]

Example Response

{
    "senateCommunications": [
        {
            "chamber": "Senate",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 117,
            "number": 1615,
            "updateDate": "2021-08-16 20:24:19+00:00",
            "url": "https://api.congress.gov/v3/senate-communication/117/ec/1615?format=json"
        },
        {
            "chamber": "Senate",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 117,
            "number": 2040,
            "updateDate": "2021-09-23 07:15:14+00:00",
            "url": "https://api.congress.gov/v3/senate-communication/117/ec/2040?format=json"
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
/senate-communication/{congress}
Returns a list of Senate communications filtered by the specified congress.

GET /senate-communication/:congress

Example Request

https://api.congress.gov/v3/senate-communication/117?api_key=[INSERT_KEY]

Example Response

  {
      "senateCommunications": [
          {
              "chamber": "Senate",
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congress": 117,
              "number": 1615,
              "updateDate": "2021-08-16T20:24:19Z",
              "url": "https://api.congress.gov/v3/senate-communication/117/ec/1615?format=json"
          },
          {
              "chamber": "Senate",
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congress": 117,
              "number": 2040,
              "updateDate": "2021-09-23T07:15:14Z",
              "url": "https://api.congress.gov/v3/senate-communication/117/ec/2040?format=json"
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

Responses
Response content type

application/xml
Code	Description
200	
Successful operation

400	
Invalid status value

GET
/senate-communication/{congress}/{communicationType}
Returns a list of Senate communications filtered by the specified congress and communication type.

GET /senate-communication/:congress/:communicationType

Example Request

https://api.congress.gov/v3/senate-communication/117/ec

Example Response

  {
      "senateCommunications": [
          {
              "chamber": "Senate",
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congress": 117,
              "number": 1615,
              "updateDate": "2021-08-16 20:24:19+00:00",
              "url": "https://api.congress.gov/v3/senate-communication/117/ec/1615?format=json"
          },
          {
              "chamber": "Senate",
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congress": 117,
              "number": 2040,
              "updateDate": "2021-09-23T07:15:14:00Z",
              "url": "https://api.congress.gov/v3/senate-communication/117/ec/2040?format=json"
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

communicationType *
string
(path)
The type of communication. Value can be ec, pm, or pom.

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
/senate-communication/{congress}/{communicationType}/{communicationNumber}
Returns detailed information for a specified Senate communication.

GET /senate-communication/:congress/:communicationType/:communicationNumber

Example Request

https://api.congress.gov/v3/senate-communication/117/ec/2561?api_key=[INSERT_KEY]

Example Response

{
    "senateCommunication": {
        "abstract": "A communication from the Board Chairman and Chief Executive Officer, Farm Credit Administration, transmitting, pursuant to law, the Administration's annual report for calendar year 2021; to the Committee on Agriculture, Nutrition, and Forestry.",
        "chamber": "Senate",
        "committees": [
            {
                "name": "Agriculture, Nutrition, and Forestry Committee",
                "referralDate": "2021-11-03",
                "systemCode": "ssaf00",
                "url": "https://api.congress.gov/v3/committee/senate/ssaf00"
            }
        ],
        "communicationType": {
            "code": "EC",
            "name": "Executive Communication"
        },
        "congress": 117,
        "congressionalRecordDate": "2021-11-03",
        "number": 2561,
        "sessionNumber": 1,
        "updateDate": "2021-11-04T07:15:16Z"
    }
}
Parameters
Try it out
Name	Description
congress *
integer
(path)
The congress number. For example, the value can be 117.

communicationType *
string
(path)
The type of communication. Value can be ec, pm, or pom.

communicationNumber *
integer
(path)
The communication’s assigned number. For example, the value can be 2561.

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