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
