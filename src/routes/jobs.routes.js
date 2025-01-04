import express from 'express';
import JobsController from '../controllers/jobs.controller.js';
import ApplicantsController from '../controllers/applicants.controller.js';

const router = express.Router();
const jobsController = new JobsController();
const applicantsController = new ApplicantsController();

// Job listing routes
router.get('/', jobsController.getAllJobs); // Retrieve all job listings
router.post('/', jobsController.createJob); // Create a new job listing
router.get('/:id', jobsController.getJobById); // Retrieve a specific job listing by ID
router.put('/:id', jobsController.updateJobById); // Update a specific job listing by ID
router.delete('/:id', jobsController.deleteJobById); // Delete a specific job listing by ID

// Applicants routes for a specific job listing
router.get('/:id/applicants', applicantsController.getAllApplicants); // Retrieve all applicants for a specific job listing
router.post('/:id/applicants', applicantsController.addApplicant); // Add a new applicant to a specific job listing
router.get('/:id/applicants/:applicantId', applicantsController.getApplicantById); // Retrieve a specific applicant by ID
router.put('/:id/applicants/:applicantId', applicantsController.updateApplicantById); // Update a specific applicant by ID
router.delete('/:id/applicants/:applicantId', applicantsController.deleteApplicantById); // Delete a specific applicant by ID

// Update form and actions for job listings
router.get('/:id/update', jobsController.renderUpdateForm); // Render the update form
router.post('/:id/update', jobsController.updateJobById); // Update a job listing using the form

// Delete job listing by ID
router.get('/:id/delete', jobsController.deleteJobById); // Render and delete job listing

// Apply to a specific job
router.post('/apply/:id', jobsController.applyToJob); // Apply to a specific job, uploading a resume

// Render 404 error page
router.get('/404', (req, res) => res.render('404')); // Handle 404 errors

export default router;
