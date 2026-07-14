# Decision Log

## 2026-06-28

Decision:
Use Service Layer.

Reason:
Keep controllers thin and reusable.

---

Decision:
Use ApiResponse<T>

Reason:
Consistent frontend contract.

---

Decision:
One user belongs to one company (MVP)

Reason:
Simplifies onboarding.

---

Every route parameter should use the resource name:

companyId

jobId

candidateId

applicationId

templateId

stageId

interviewId

noteId

---

company-onboarding.service.ts is created
This service will orchestrate multiple services.

Company Service
↓
Create Company
↓
Update User
↓
Create Default Pipeline
↓
Return Company

company-onboarding.service.ts

will not know how:

companies are created
pipelines are created

It simply coordinates them.

---
