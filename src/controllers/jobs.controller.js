import JobModel from '../models/jobs.model.js';

class JobsController {
  getJobs(req, res, next) {
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

//   getAddProduct(req, res, next) {
//     res.render('new-product', {
//       errorMessage: null,
//     });
//   }

//   postAddProduct(req, res, next) {
    
//     ProductModel.add(req.body);
//     var products = ProductModel.getAll();
//     res.render('index', { products });
//   }
}

export default JobsController;
