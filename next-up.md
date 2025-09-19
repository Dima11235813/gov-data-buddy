now if we have a picture for a member we can add it to the collection of members on the member page and show that image instead of the person icon, make sure to update the user story for that use case and ensure the icon is the same size whether it's the placeholder or the saved image

now let's wire up the front end UI filters to utilize
right now we're always invoking 
Fetching for API_URL https://api.congress.gov/v3/member?format=json&offset=0&limit=12

from the front end but we want to 

This should really avoid dupliating magic strings, update our @.cursorrules to avoid this and rely on enums for enumerable collections of strings see bill detail model file for source of enum @BillDetail.model.ts 

let's add this image as the background on the home page 