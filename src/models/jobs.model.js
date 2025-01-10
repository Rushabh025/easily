export default class JobModel {
    constructor(id, companyName, jobCategory, jobDesignation, jobLocation, salary, applyby, skillsReq, numberOfOpenings, jobPosted, applicants) {
        this.id = id;
        this.companyName = companyName;
        this.jobCategory = jobCategory;
        this.jobDesignation = jobDesignation;
        this.jobLocation = jobLocation;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsReq = Array.isArray(skillsReq) ? skillsReq : []; // Ensure skillsReq is an array
        this.numberOfOpenings = numberOfOpenings;
        this.jobPosted = jobPosted;
        this.applicants = applicants;
    }

    static getAll() {
        return jobs;
    }

    static getJob(id){
        var job = jobs.find(job => job.id === parseInt(id,10));
        return job;
    }

    static add(jobObj) {
        // console.log(jobObj);
        let newJob = new JobModel(
            jobs.length + 1,
            jobObj.id,
            jobObj.companyName,
            jobObj.jobCategory,
            jobObj.jobDesignation,
            jobObj.jobLocation,
            jobObj.salary,
            jobObj.applyby,
            jobObj.skillsReq,
            jobObj.numberOfOpenings,
            jobObj.jobPosted,
            jobObj.applicants
        );
        jobs.push(newJob);
    }

    static updateJob(id, jobData){
        var job = jobs.find(job => job.id === parseInt(id,10));
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const { companyName, 
            jobCategory, 
            jobDesignation, 
            jobLocation, 
            salary, 
            applyBy, 
            skillsReq, 
            numberOfOpenings, 
            jobPosted, 
            applicants } = jobData;
        
        job.companyName = companyName || job.companyName;
        job.jobCategory = jobCategory || job.jobCategory;
        job.jobDesignation = jobDesignation || job.jobDesignation;
        job.jobLocation = jobLocation || job.jobLocation;
        job.salary = salary || job.salary;
        job.applyby = applyBy || job.applyby;

        // Handle skillsReq - only update if new values are provided
        if (skillsReq && skillsReq.length > 0) {
            job.skillsReq = skillsReq; // Update skillsReq with new values if provided
        }

        job.numberOfOpenings = numberOfOpenings || job.numberOfOpenings;
        job.jobPosted = jobPosted || job.jobPosted;
        job.applicants = applicants || job.applicants;
        
        return job;  // Return the updated job
    }


    static deleteJob(id) {
        // Find the index of the job by its ID
        const jobIndex = jobs.findIndex(job => job.id === parseInt(id, 10));

        // If the job doesn't exist, return false
        if (jobIndex === -1) {
            return false;
        }

        // Remove the job from the array
        jobs.splice(jobIndex, 1);
        return true;  // Return true if job was deleted
    }
}

var jobs = [
    new JobModel(
        1, "Tech Corp", 'Software Development', 'Software Developer', 'Mumbai', '350000',
        '2024-09-30',
        ['JavaScript', 'Node.js', 'React'],
        2,
        '2024-08-25',
        1
    )
];
