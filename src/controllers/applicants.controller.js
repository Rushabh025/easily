import ApplicantModel from '../models/applicants.model.js';

class ApplicantsController {
    getAllApplicants(req, res, next) {
        var applicants = ApplicantModel.getAllApplicants();
    
        // Pass applicants
        res.render('applicant-list', { applicants });
        
    }

    addApplicant(req, res, next) {
        
    }

    getApplicantById(req, res, next) {
        
    }

    updateApplicantById(req, res, next) {
        
    }

    deleteApplicantById(req, res, next) {
        
    }
}

export default ApplicantsController;