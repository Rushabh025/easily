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

    static add(jobObj) {
        let newJob = new JobModel(
            jobs.length + 1,
            jobObj.id,
            jobObj.companyName,
            jobObj.jobCategory,
            jobObj.jobDesignation,
            jobObj.salary,
            jobObj.applyby,
            jobObj.skillsReq,
            jobObj.numberOfOpenings,
            jobObj.jobPosted,
            jobObj.applicants
        );
        jobs.push(newJob);
    }
}

var jobs = [
    new JobModel(
        1, "Tech Corp", 'Software Development', 'Software Development', 'Mumbai', '350000',
        '2024-09-30',
        ['JavaScript', 'Node.js', 'React'],
        2,
        '2024-08-25',
        1
    )
];
