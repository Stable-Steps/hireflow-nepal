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
