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
