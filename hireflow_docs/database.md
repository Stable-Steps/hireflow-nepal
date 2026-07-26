## companies

id
name
slug
logo_url
created_at

## users

id
company_id
email
full_name
role

## jobs

id
company_id
title
department
description
status

## candidates

id
company_id
first_name
last_name
email
phone
resume_url

## applications

id
candidate_id
job_id
stage_id

## stages

id
company_id
name
position
color

## candidates

Primary Key

- id

Relationships

- company_id -> companies.id

Soft Delete

- deleted_at

Unique Constraints

- (company_id, email)

Indexes

- company_id
- email
- deleted_at
- (last_name, first_name)

## applications

### Purpose

Connects candidates to jobs and tracks their progress through the hiring pipeline.

### Relationships

- company_id -> companies.id
- candidate_id -> candidates.id
- job_id -> jobs.id
- pipeline_stage_id -> pipeline_stages.id
- assigned_recruiter_id -> users.id

### Fields

- id
- company_id
- candidate_id
- job_id
- pipeline_stage_id
- assigned_recruiter_id
- status
- applied_at
- created_at
- updated_at
- deleted_at

### Constraints

- UNIQUE(candidate_id, job_id)

### Indexes

- company_id
- candidate_id
- job_id
- pipeline_stage_id
- assigned_recruiter_id
- deleted_at

### Notes

- Soft delete supported via deleted_at.
- One candidate can apply to many jobs.
- One job can have many candidates.
- Applications are isolated per company.

## applications

Purpose

Stores candidate applications and hiring progress.

Relationships

- company_id -> companies.id
- candidate_id -> candidates.id
- job_id -> jobs.id
- pipeline_stage_id -> pipeline_stages.id
- assigned_recruiter_id -> users.id

Constraints

- UNIQUE(candidate_id, job_id)

Indexes

- company_id
- candidate_id
- job_id
- pipeline_stage_id
- assigned_recruiter_id
- deleted_at

Soft Delete

- deleted_at

Notes

- Each candidate can apply once per job.
- Every application belongs to a company.
- Applications automatically start in the first stage of the default pipeline.

## notes

Purpose

- Stores recruiter notes on applications.

Relationships

- company_id -> companies.id
- application_id -> applications.id
- author_id -> users.id

Fields

- id
- company_id
- application_id
- author_id
- content
- created_at
- updated_at
- deleted_at

Soft delete

- deleted_at

Indexes

- company_id
- application_id
- author_id
- deleted_at
