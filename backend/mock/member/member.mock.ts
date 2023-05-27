// TODO Set up schema for member query
export const mockMemberQuery: any = {
    "pagination":
    {
        "count": 309,
        "next":
            `https://api.congress.gov/v3/member?fromDateTime=2023-01-01T00:00:00Z&toDateTime=2023-05-27T00:00:00Z&offset=250&limit=250&format=json`
    },
    "request":
    {
        "contentType": "application/json",
        "format": "json"
    }
}
// TODO Set up mock data for Tom Sawyer
export const mockMemberList: any[] = [
    {
        "member":
        {
            "bioguideId": "S000094",
            "depiction":
            {
                "attribution": "Collection of the U.S. House of Representatives",
                "imageUrl": "https://www.congress.gov/img/member/s000094_200.jpg"
            },
            "district": 14,
            "name": "Sawyer, Tom",
            "party": "Democratic",
            "served":
            {
                "House":
                    [
                        {
                            "end": 2003,
                            "start": 1987
                        }
                    ]
            },
            "state": "Ohio",
            "updateDate": "2021-08-08T20:46:01Z",
            "url": "https://api.congress.gov/v3/member/S000094?format=json"
        }
    }
] 