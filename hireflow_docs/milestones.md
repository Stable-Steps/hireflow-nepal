# Milestone 1

Completed:

- Backend foundation
- Jobs CRUD
- Tenant foundation

Git Tag:

v0.1.0

Onboarding

□ Create company

□ Create owner user

□ Create default pipeline

□ Create default stages

□ Send welcome email

## ✅ Candidate Module

### Database

- Added candidates table
- Multi-tenant support using company_id
- Soft delete (deleted_at)
- created_at / updated_at timestamps
- Unique constraint on (company_id, email)
- Added indexes for company, email, deleted_at and name

### Backend

- Candidate types
- Candidate service
- Candidate controller
- Candidate routes

### Features

- Create Candidate
- Get All Candidates
- Get Candidate by ID
- Update Candidate
- Soft Delete Candidate

### Security

- Authenticated endpoints
- Company isolation using req.user.company_id
- Duplicate email prevention per company

### Testing

- Create ✅
- Read All ✅
- Read By ID ✅
- Update ✅
- Soft Delete ✅
- Duplicate Email Validation ✅

## ✅ Applications Module

### Database

- Applications table
- Multi-tenant architecture
- Soft delete
- Recruiter assignment
- Application status
- Unique candidate/job constraint
- Performance indexes

### Backend

- Application constants
- Types
- CRUD service
- Workflow service
- Controller
- Routes

### Workflow

Candidate
↓
Find Default Pipeline
↓
Find First Stage
↓
Create Application
↓
Assign Initial Stage

### Testing

- Create Application ✅
- Auto Assign First Stage ✅
- Get All ✅
- Get By ID ✅
- Update ✅
- Soft Delete ✅
- Duplicate Prevention ✅

# ✅ Pipeline Board

## Completed

### Applications

- Applications database schema
- Multi-tenant support
- Soft delete
- Assigned recruiter support
- Application status
- Automatic default pipeline assignment
- Duplicate application prevention

### Services

- application.service
- application-workflow.service

### Controllers

- Application CRUD
- Apply Candidate workflow

### Routes

GET /api/applications
POST /api/applications
GET /api/applications/:id
PATCH /api/applications/:id
DELETE /api/applications/:id

### Pipeline Board

- Pipeline board service
- Pipeline board controller
- Pipeline board routes
- Load board by job
- Move application between stages

### Workflow

Candidate
↓
Apply to Job
↓
Default Pipeline
↓
First Stage
↓
Application Created
↓
Move Through Pipeline

### Testing

- Create Application ✅
- Auto Assign First Stage ✅
- Get Applications ✅
- Update Application ✅
- Delete Application ✅
- Load Pipeline Board ✅
- Move Candidate Between Stages ✅

## ✅ Notes Module

### Database

- Notes table
- Multi-tenant support
- Soft delete
- Timestamp support

### Backend

- Note types
- Note service
- Note controller
- Note routes

### Workflow

- Create note
- Log NOTE_ADDED activity

### Testing

- Create ✅
- Get by application ✅
- Update ✅
- Soft delete ✅
- Activity logging ✅

## ✅ Interviews Module

### Database

- Interviews table
- Multi-tenant support
- Soft delete
- Time validation

### Backend

- Interview types
- Interview service
- Interview controller
- Interview routes

### Workflow

- Create interview
- Log INTERVIEW_SCHEDULED activity

### Testing

- Create ✅
- Get by application ✅
- Get by id ✅
- Update ✅
- Soft delete ✅
- Activity logging ✅

## ✅ Email Module

### Database

- Emails table
- Multi-tenant support
- Soft delete
- Sent/received tracking

### Backend

- Email types
- Email service
- Email controller
- Email routes

### Workflow

- Create email
- Log EMAIL_SENT activity

### Testing

- Create ✅
- Get by application ✅
- Get by id ✅
- Update ✅
- Soft delete ✅
- Activity logging ✅

## ✅ AI Match Module

### Backend

- AI service
- AI controller
- AI routes

### Feature

- Candidate-job match scoring

### Testing

- Match score returned ✅
- Tenant isolation enforced ✅
