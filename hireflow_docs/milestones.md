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
