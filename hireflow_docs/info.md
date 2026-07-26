## Permissions

| Action          | Owner | Admin | Recruiter | Hiring Manager |
| --------------- | ----- | ----- | --------- | -------------- |
| Create Jobs     | ✅    | ✅    | ✅        | ❌             |
| Manage Users    | ✅    | ✅    | ❌        | ❌             |
| Move Candidates | ✅    | ✅    | ✅        | ✅             |
| Delete Company  | ✅    | ❌    | ❌        | ❌             |
| Delete Job      | ✅    | ❌    | ❌        | ❌             |
| Delete User     | ✅    | ❌    | ❌        | ❌             |

## Authentication

- Email
- Password
- Google
- Github
- LinkedIn

## updated database structure for hireflow

Company
│
├───────────── Users
│
├───────────── Invitations
│
├───────────── Jobs
│
├───────────── Candidates
│ │
│ │
│ Applications
│ │ │
│ │ │
│ Interviews Notes
│ │
│ Attachments
│
└───────────── Pipeline Stages

## Architecture

Current backend modules

- Authentication
- Company
- Company Onboarding
- Users
- Jobs
- Candidates
- Pipeline Templates
- Pipeline Stages
- Applications
- Pipeline Board

Architecture Pattern

Controller
↓
Service
↓
Workflow Service (when needed)
↓
Supabase

Principles

- Multi-tenant
- Soft delete
- Service-oriented
- Workflow separated from CRUD
- Default pipeline automation
