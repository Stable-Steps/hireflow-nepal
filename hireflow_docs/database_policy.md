## Database Stability Policy v1.0

Every table must justify its existence.

Before we create a table, we answer:

What business problem does it solve?
Can another table already solve it?
Will we need this in 2 years?
Will we regret not having it?

If the answer isn't clear, we don't create the table.

Every mutable table has:

created_at
updated_at

Exceptions:

audit/activity logs (append-only)
invitations (may also benefit from updated_at, but it's optional)
