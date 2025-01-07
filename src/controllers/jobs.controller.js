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

  }

  getJobById(req, res, next){
    var id = req.params.id;
    var job = JobModel.getJob(id);
    var applicants = ApplicantModel.numberOfApplicants();
    res.render('job-details', {job, applicants});
  }

  updateJobById(req, res, next){
    
  }

  deleteJobById(req, res, next){
    
  }

  renderUpdateForm(req, res, next){
    
  }

  applyToJob(req, res, next){
    
  }
}

export default JobsController;
