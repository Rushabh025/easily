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

  updateJobById(req, res, next){
    
  }

  deleteJobById(req, res, next){
    
  }

  renderUpdateForm(req, res, next){
    
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
