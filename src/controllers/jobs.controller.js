import JobModel from '../models/jobs.model.js';
import ApplicantModel from '../models/applicants.model.js';

class JobsController {
  getAllJobs(req, res, next) {
    var jobs = JobModel.getAll();
    // Initialize lastVisit if it's undefined
    if (!req.session.lastVisit) {
        req.session.lastVisit = new Date().toLocaleString();
    }

    // Retrieve the last visit from the session
    const lastVisit = req.session.lastVisit;

    // Pass jobs and lastVisit to the template
    res.render('job-listing', { jobs, lastVisit });
  }

  createJob(req, res, next){
    const { companyName, jobCategory, jobDesignation, jobLocation, salary, applyBy, skillsReq, numberOfOpenings } = req.body;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var jobPosted = mm + '/' + dd + '/' + yyyy;

    var applicants = 0;
    const errorMessage = req.query.errorMessage || null;

    // Proceed to save the applicant details
    const jobData = {
      companyName, 
      jobCategory, 
      jobDesignation, 
      jobLocation, 
      salary, 
      applyBy, 
      skillsReq, 
      numberOfOpenings, 
      jobPosted, 
      applicants
    };

    JobModel.add(jobData);

    res.render('new-job', {errorMessage});
  }

  getJobById(req, res, next){
    var id = req.params.id;
    var job = JobModel.getJob(id);
    var applicants = ApplicantModel.numberOfApplicants();
    res.render('job-details', { job, applicants });
  }

  updateJobById(req, res, next) {
    const id = req.params.id;
    const {
        companyName, jobCategory, jobDesignation, jobLocation, salary, applyBy,
        skillsReq, numberOfOpenings, jobPosted, applicants
    } = req.body;

    // Find the existing job by ID
    const existingJob = JobModel.getJob(id); // Assumes you have a method to get a job by ID
    if (!existingJob) {
        return res.status(404).send("Job not found.");
    }

    // Prepare updated fields only
    const updatedData = {};

    if (companyName) updatedData.companyName = companyName;
    if (jobCategory) updatedData.jobCategory = jobCategory;
    if (jobDesignation) updatedData.jobDesignation = jobDesignation;
    if (jobLocation) updatedData.jobLocation = jobLocation;
    if (salary) updatedData.salary = parseFloat(salary); // Ensure salary is a number
    if (applyBy) updatedData.applyBy = applyBy;
    
    // Filter out the default placeholder "select skills required for this job" from the current skills array
    const currentSkills = existingJob.skillsReq.filter(skill => skill !== "select skills required for this job");

    // Handle skillsReq update or retain the old skills
    if (skillsReq) {
        // If skills are provided, split them and filter out the placeholder
        const parsedSkills = Array.isArray(skillsReq)
            ? skillsReq
            : skillsReq.split(',').map(skill => skill.trim());

        updatedData.skillsReq = parsedSkills.filter(skill => skill !== "select skills required for this job");
    } else {
        // If no skills are updated, retain the existing skills, but remove the default placeholder if it exists
        updatedData.skillsReq = currentSkills;
    }

    if (numberOfOpenings) updatedData.numberOfOpenings = parseInt(numberOfOpenings, 10);
    if (jobPosted) updatedData.jobPosted = jobPosted;
    if (applicants) updatedData.applicants = applicants;

    // Merge existing job with updated fields
    const updatedJob = { ...existingJob, ...updatedData };

    // console.log(updatedJob);

    // Update the job in the model
    const success = JobModel.updateJob(id, updatedJob);
    if (!success) {
        return res.status(500).send("Failed to update the job.");
    }

    res.redirect('/jobs');
  }


  deleteJobById(req, res, next){
    const id = parseInt(req.params.id, 10); // Get job ID from URL parameter

    // Call the model to delete the job
    const isDeleted = JobModel.deleteJob(id);

    if (!isDeleted) {
      // If job was not found, send a 404 response
      return res.status(404).send('Job not found.');
    }

    // If deletion is successful, send a success response
    res.redirect('/jobs?success=Deleted successfully');

  }

  renderUpdateForm(req, res, next){
    const errorMessage = req.query.errorMessage || null;
    var id = parseInt(req.params.id, 10)
    // console.log(id);
    var job = JobModel.getJob(id);
    // console.log(job);
    res.render('update-job', { errorMessage, job });
  }

  applyToJob(req, res, next){
    // console.log(req.body);
    // console.log('File:', req.file);
    try{

      if (!req.file.path) {
        return res.status(400).send('Resume file is required.');
      }

      // const resumePath = req.file.path; // Path where the resume is saved
      // console.log('Uploaded file details:', req.file);

      // Proceed to save the applicant details
      const applicantdata = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        resume: req.file.path, // Path to the uploaded resume
      };

      ApplicantModel.addApplicant(applicantdata);

      // Simulated success
      console.log('Applied for job');
      res.redirect('/jobs?success=Applied successfully');
    }catch(error){
      console.error('Error during submission of Job application:', error);
      return next(error);
    }

  }

}

export default JobsController;
