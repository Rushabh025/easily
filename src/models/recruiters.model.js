export default class RecruitersModel{

    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static addRecruiter(recruiter){
        const newRecruiter = {
            id: recruiters.length + 1, // Auto-incrementing ID
            ...recruiter,
        };
        recruiters.push(newRecruiter);
        return newRecruiter;
    }

    static findByEmail(email){
        return recruiters.find(recruiter => recruiter.email === email);
    }
}

var recruiters = [
    new RecruitersModel(1, "rushabh", "rushabh@gmail.com", "12345")
];