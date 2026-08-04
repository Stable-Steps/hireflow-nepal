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

# Applications

GET /api/applications
POST /api/applications
GET /api/applications/:id
PATCH /api/applications/:id
DELETE /api/applications/:id

POST /api/applications

Creates a new application by:

- Finding the company's default pipeline
- Selecting the first pipeline stage
- Creating the application
- Assigning the first stage automatically

Request

{
"candidate_id": "uuid",
"job_id": "uuid"
}

# Applications

GET /api/applications
POST /api/applications
GET /api/applications/:id
PATCH /api/applications/:id
DELETE /api/applications/:id

POST /api/applications

Request

{
"candidate_id": "uuid",
"job_id": "uuid"
}

Automatically

- Finds default pipeline
- Finds first stage
- Creates application
- Assigns first stage

---

# Pipeline Board

GET /api/pipeline-board/:jobId

Returns

[
{
"id": "...",
"name": "Applied",
"applications": []
}
]

PATCH /api/applications/:id/move

Request

{
"pipeline_stage_id": "uuid"
}

## Notes

GET /api/notes/:applicationId
POST /api/notes
PATCH /api/notes/:id
DELETE /api/notes/:id

## Interviews

GET /api/interviews/application/:applicationId
GET /api/interviews/:id
POST /api/interviews
PATCH /api/interviews/:id
DELETE /api/interviews/:id

## Emails

GET /api/emails/application/:applicationId
GET /api/emails/:id
POST /api/emails
PATCH /api/emails/:id
DELETE /api/emails/:id

## AI

POST /api/ai/match

Request
{
"candidate_id": "uuid",
"job_id": "uuid"
}

Returns

- score
- verdict
- summary
- strengths
- gaps
- recommendation
