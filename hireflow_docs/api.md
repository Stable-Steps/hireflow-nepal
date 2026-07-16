## Jobs

GET /api/jobs
POST /api/jobs
GET /api/jobs/:id
PATCH /api/jobs/:id

Description:
Returns all jobs belonging to the authenticated company.

Authentication:
Required

Response:

{
success: true,
data: Job[]
}

## Company

GET /api/company
PATCH /api/company
POST /api/company
GET /api/company/:id

Description:
Returns the current company.

Authentication:
Required

Response:

{
success: true,
data: Company
}

## Candidates

GET /api/candidates
GET /api/candidates/:id

## Applications

POST /api/applications
PATCH /api/applications/:id/stage

## Notes

POST /api/notes

## Candidates

GET /api/candidates
POST /api/candidates
GET /api/candidates/:id
PATCH /api/candidates/:id
DELETE /api/candidates/:id
