// Mock data for member queries
export const mockMemberQuery: any = {
    "pagination": {
        "count": 535,
        "next": "https://api.congress.gov/v3/member?fromDateTime=2023-01-01T00:00:00Z&toDateTime=2023-12-31T23:59:59Z&offset=250&limit=250&format=json"
    },
    "request": {
        "contentType": "application/json",
        "format": "json"
    }
}

// Mock member list with various representatives and senators
export const mockMemberList: any[] = [
    {
        "bioguideId": "S000094",
        "depiction": {
            "attribution": "Collection of the U.S. House of Representatives",
            "imageUrl": "https://www.congress.gov/img/member/s000094_200.jpg"
        },
        "district": 14,
        "name": "Tom Sawyer",
        "party": "D",
        "served": {
            "House": [
                {
                    "end": 2003,
                    "start": 1987
                }
            ]
        },
        "state": "OH",
        "updateDate": "2021-08-08T20:46:01Z",
        "url": "https://api.congress.gov/v3/member/S000094?format=json"
    },
    {
        "bioguideId": "P000197",
        "depiction": {
            "attribution": "Collection of the U.S. House of Representatives",
            "imageUrl": "https://www.congress.gov/img/member/p000197_200.jpg"
        },
        "district": 12,
        "name": "Nancy Pelosi",
        "party": "D",
        "served": {
            "House": [
                {
                    "end": null,
                    "start": 1987
                }
            ]
        },
        "state": "CA",
        "updateDate": "2023-01-01T00:00:00Z",
        "url": "https://api.congress.gov/v3/member/P000197?format=json"
    },
    {
        "bioguideId": "M000355",
        "depiction": {
            "attribution": "Collection of the U.S. Senate",
            "imageUrl": "https://www.congress.gov/img/member/m000355_200.jpg"
        },
        "district": null,
        "name": "Marsha Blackburn",
        "party": "R",
        "served": {
            "Senate": [
                {
                    "end": null,
                    "start": 2019
                }
            ]
        },
        "state": "TN",
        "updateDate": "2023-01-01T00:00:00Z",
        "url": "https://api.congress.gov/v3/member/M000355?format=json"
    }
];

// Mock detailed member response
export const mockMemberDetails = {
    "member": {
        "bioguideId": "P000197",
        "depiction": {
            "attribution": "Collection of the U.S. House of Representatives",
            "imageUrl": "https://www.congress.gov/img/member/p000197_200.jpg"
        },
        "district": 12,
        "name": "Nancy Pelosi",
        "party": "D",
        "served": {
            "House": [
                {
                    "end": null,
                    "start": 1987
                }
            ]
        },
        "state": "CA",
        "updateDate": "2023-01-01T00:00:00Z",
        "url": "https://api.congress.gov/v3/member/P000197?format=json"
    },
    "request": {
        "contentType": "application/json",
        "format": "json"
    }
};

// Mock search results
export const mockMemberSearchResults = {
    "members": mockMemberList,
    "pagination": mockMemberQuery.pagination,
    "request": mockMemberQuery.request
}; 