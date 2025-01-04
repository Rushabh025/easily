# Easily
A job portal website that allows recruiters to post and manage job listings and provides a user-friendly platform for job seekers to find and apply for suitable roles.

Demo Link : 

## Acceptance Criteria

1. Implement an MVC (Model View Controller) architecture with ExpressJS to separate data handling, interface rendering, and routing control.
2. Implement EJS for server-side templating, providing dynamic HTML generation based on server data.
3. Utilize ES6 Modules to maintain code modularity and organization.
4. Use Express sessions for managing user sessions and a cookie-based tracking of the last visit.
5. Use in-memory data structures for user and job management operations.
6. Implement a login and registration system, allowing recruiters to create and log into their accounts.
7. Allow job seekers to view all jobs, view details of a specific job, and apply to a job by providing their details.
8. Allow recruiters to create, update, delete, and view job postings, with necessary validation for each field in the job posting.
9. Enable recruiters to view all applicants of a job, including their submitted resume files.
10. Implement an email system to send confirmation emails to applicants after they apply to a job.
11. Use middleware for handling authentication, tracking of the last visit, file upload processing, and sending confirmation emails.
12. Store the resume files on the server using a file upload middleware.
13. Ensure original and high-quality code with comprehensive documentation.


## API Structure
The API structure for the "Easily" job portal project can be organized as follows:

Auth routes
  + POST /register
    - Register a new recruiter account
  + GET /
    - Render the login page
  + POST /login
    - Log in as a recruiter
  + POST /logout
    - Log out the currently logged-in recruiter


Job routes
  + /jobs
      + GET /
        - Retrieve all job listings
      + POST /
        - Create a new job listing
      + GET /:id
        - Retrieve a specific job listing by ID
      + PUT /:id
        - Update a specific job listing by ID
      + DELETE /:id
        - Delete a specific job listing by ID
  
  + /jobs/:id/applicants
    + GET /
        - Retrieve all applicants for a specific job listing
    + POST /
        - Add a new applicant to a specific job listing
    + GET /:applicantId
        - Retrieve a specific applicant by ID for a job listing
    + PUT /:applicantId
        - Update a specific applicant by ID for a job listing
    + DELETE /:applicantId
        - Delete a specific applicant by ID for a job listing
  
  + /jobs/:id/update
    + GET /
        - Render the update form for a specific job listing
    + POST /
        - Update a specific job listing by ID
  
  + /jobs/:id/delete
    + GET /
        - Delete a specific job listing by ID
    
  + /apply/:id
    + POST /
        - Apply to a specific job listing by ID, uploading a resume
    
  + /404
    + GET /
        - Render the 404 error page

## Screenshots

## Author:
+ Rushabh Mahawarkar
+ Email Id : rushabh.mahawarkar@gmail.com
+ Contact Number : 9082466183
+ LinkedIn : https://www.linkedin.com/in/rushabh-mahawarkar-7727301a3/