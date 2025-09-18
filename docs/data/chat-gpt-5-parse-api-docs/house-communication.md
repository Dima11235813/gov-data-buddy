# House Communication

house-communication
Returns House communication data from the API


GET
/house-communication
Returns a list of House communications.

GET /house-communication

Example Request

https://api.congress.gov/v3/house-communication?api_key=[INSERT_KEY]

Example Response

  {
      "houseCommunications": [
          {
              "chamber": "House",
              "communicationNumber": 2057,
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congressNumber": 117,
              "url": "https://api.congress.gov/v3/house-communication/117/ec/2057?format=json"
          },
          {
              "chamber": "House",
              "communicationNumber": 125,
              "communicationType": {
                  "code": "EC",
                  "name": "Executive Communication"
              },
              "congressNumber": 115,
              "url": "https://api.congress.gov/v3/house-communication/115/ec/125?format=json"
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
/house-communication/{congress}
Returns a list of House communications filtered by the specified congress.

GET /house-communication/:congress

Example Request

https://api.congress.gov/v3/house-communication/117?api_key=[INSERT_KEY]

Example Response

{
    "houseCommunications": [
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congressNumber": 117,
            "number": "2057",
            "reportNature": "A letter reporting violations of the Antideficiency Act, by the United States Coast Guard.",
            "submittingAgency": "Department of Homeland Security",
            "submittingOfficial": "Secretary",
            "updateDate": "2021-09-01",
            "url": "https://api.congress.gov/v3/house-communication/117/ec/2057?format=json"
        },
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congressNumber": 117,
            "legalAuthority": "Public Law 93\u2013198, section 602(c)(1); (87 Stat. 814)",
            "number": "3089",
            "reportNature": "D.C. Act 24-267, \"Jamal Khashoggi Way Designation Way Act of 2021\".",
            "submittingAgency": "Council of the District of Columbia",
            "submittingOfficial": "Chairman",
            "updateDate": "2022-01-12",
            "url": "https://api.congress.gov/v3/house-communication/117/ec/3089?format=json"
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
/house-communication/{congress}/{communicationType}
Returns a list of House communications filtered by the specified congress and communication type.

GET /house-communication/:congress/:communicationType

Example Request

https://api.congress.gov/v3/house-communication/117/ec?api_key=[INSERT_KEY]

Example Response

{
    "houseCommunications": [
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congressNumber": 117,
            "number": "2057",
            "reportNature": "A letter reporting violations of the Antideficiency Act, by the United States Coast Guard.",
            "submittingAgency": "Department of Homeland Security",
            "submittingOfficial": "Secretary",
            "updateDate": "2021-09-01",
            "url": "https://api.congress.gov/v3/house-communication/117/ec/2057?format=json"
        },
        {
            "chamber": "House",
            "communicationNumber": 3089,
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congressNumber": 117,
            "legalAuthority": "Public Law 93\u2013198, section 602(c)(1); (87 Stat. 814)",
            "number": "3089",
            "reportNature": "D.C. Act 24-267, \"Jamal Khashoggi Way Designation Way Act of 2021\".",
            "submittingAgency": "Council of the District of Columbia",
            "submittingOfficial": "Chairman",
            "updateDate": "2022-01-12",
            "url": "https://api.congress.gov/v3/house-communication/117/ec/3089?format=json"
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

communicationType *
string
(path)
The type of communication. Value can be ec, ml, pm, or pt.

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
/house-communication/{congress}/{communicationType}/{communicationNumber}
Returns detailed information for a specified House communication.

GET /house-communication/:congress/:communicationType/:communicationNumber

Example Request

https://api.congress.gov/v3/house-communication/117/ec/3324?api_key=[INSERT_KEY]

Example Response

{
    "house-communication": {
        "abstract": "A letter from the Chairman, Council of the District of Columbia, transmitting DC Act 24-299, \"Closing of a Portion of a Public Alley in Square 5138, S.O. 20-07517, Act of 2021\", pursuant to Public Law 93\u2013198, section 602(c)(1); (87 Stat. 814); to the Committee on Oversight and Reform.",
        "chamber": "House",
        "committees": [
            {
                "name": "Oversight and Accountability Committee",
                "referralDate": "2022-02-01"
                "systemCode": "hsgo00",
                "url": "api.congress.gov/v3/committee/house/hsgo00
            }
        ],
        "communicationType": {
            "code": "EC",
            "name": "Executive Communication"
        },
        "congressNumber": 117,
        "congressionalRecordDate": "2022-02-01"
        "congressionalRecordDate": "2022-02-01"
        "isRulemaking": "False",
        "legalAuthority": "Public Law 93\u2013198, section 602(c)(1); (87 Stat. 814)",
        "matchingRequirements": [
            { {
                "number": "2120",
                "url": "http://api.congress.gov/v3/house-requirement/2120"
      }
        ],
        "number": "3324",
        "reportNature": "DC Act 24-299, \"Closing of a Portion of a Public Alley in Square 5138, S.O. 20-07517, Act of 2021\".",
        "sessionNumber": 2,
        "submittingAgency": "Council of the District of Columbia",
         "submittingOfficial": "Chairman",
         "updateDate": "2022-02-02"
    },
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
The type of communication. Value can be ec, ml, pm, or pt.

communicationNumber *
integer
(path)
The communication’s assigned number. For example, the value can be 3324.

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

house-requirement
Returns House requirement data from the API


GET
/house-requirement
Returns a list of House requirements.

GET /house-requirement

Example Request

https://api.congress.gov/v3/house-requirement?api_key=[INSERT_KEY]

Example Response

{
    "houseRequirements": [
    {
        "number": 8070,
        "updateDate": "2021-08-13",
        "url": "https://api.congress.gov/v3/house-requirement/8070?format=json"
    },
    {
        "number": 6463,
        "updateDate": "2021-08-13",
        "url": "https://api.congress.gov/v3/house-requirement/6463?format=json"
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
/house-requirement/{requirementNumber}
Returns detailed information for a specified House requirement.

GET /house-requirement/:requirementNumber

Example Request

https://api.congress.gov/v3/house-requirement/8070?api_key=[INSERT_KEY]

Example Response

{
    "houseRequirement": {
        "activeRecord": true,
        "frequency": "[No deadline specified].",
        "legalAuthority": "5 U.S.C. 801(a)(1)(A); Public Law 104\u2013121, section 251; (110 Stat. 868)",
        "matchingCommunications": {
            "count": 85085,
            "url": "https://api.congress.gov/v3/house-requirement/8070/matching-communications?format=json"
        },
        "nature": "Congressional review of agency rulemaking.",
        "number": 8070,
        "parentAgency": "Multiple Executive Agencies and Departments",
        "submittingAgency": Multiple Executive Agencies and Departments",
        "submittingOfficial": null,
        "updateDate": "2021-08-13"
    }
Parameters
Try it out
Name	Description
requirementNumber *
integer
(path)
The requirement’s assigned number. For example, the value can be 8070.

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
/house-requirement/{requirementNumber}/matching-communications
Returns a list of matching communications to a House requirement.

GET /house-requirement/:requirementNumber/matching-communications

Example Request

https://api.congress.gov/v3/house-requirement/8070/matching-communications?api_key=[INSERT_KEY]

Example Response

{
    "matchingCommunications": [
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 112,
            "number": 2,
            "url": "https://api.congress.gov/v3/house-communication/112/EC/2?format=json"
        },
        {
            "chamber": "House",
            "communicationType": {
                "code": "EC",
                "name": "Executive Communication"
            },
            "congress": 112,
            "number": 3,
            "url": "https://api.congress.gov/v3/house-communication/112/EC/3?format=json"
        },
    ]
}
Parameters
Try it out
Name	Description
requirementNumber *
integer
(path)
The requirement’s assigned number. For example, the value can be 8070.

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