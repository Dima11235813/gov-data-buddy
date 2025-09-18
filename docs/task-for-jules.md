This project doesn't have much documenation.

We should update the docs, and do a code review to create a road-map plan with a hierarchical structure of epics, features, user stories, and tasks for this app.

The goal is to build out a caching and persistence layer for all queries from the front end.

The gov buddy app creates a user friendly angular client app, with many pages, representing the various entities in the swagger docs for the gov api.

Part of the project should be to add NGrx to the client side, and add the following src/ folders

actions
reducers
state - Contains global app state, and a class per page so we can 
viewModel - Classes that have static members that receive one or more data transfer objects and return view models which are passed to pure components
selectors

components
shared

The backend should be evaluated for compliance with best practices, and a domain driven design should be created so that navigating the project is simple and there is an obvious place where files should live.
Make plans for a CQRS pattern since we know this app will be read heavy and not very write heavy so we'll plan for that optimziation.

The output of this plan should Ideally be convertable into an in repo folder at the top level called proj-mgmt and it should container the epics, features, stories and tasks/bugs so we can have version control of the project managemet assets.
This task is to create the plan on a branch for me to review, you must ensure that the front end and back end still build properly before you're done with this task.
