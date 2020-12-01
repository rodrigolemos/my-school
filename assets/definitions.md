Migrations/Models

user -> created_by: auto
enrollment -> created_by
course -> created_by

Rules

1. USERS can sign up as STUDENT (default)
2. Admin can sign up USERS as TEACHER or ADMIN
3. Only admin can create COURSES
4. COURSES list are available to everyone
5. Admin can ENROLL USERS (student and teacher) to COURSES, but USERS (student) can ENROLL theirselves as well
6. An admin CAN NOT BE ENROLLED to a COURSE
7. USERS (student and teacher) can view in what COURSES they're ENROLLED; Admin see all ENROLLMENTS