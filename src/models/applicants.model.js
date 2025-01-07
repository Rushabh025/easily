export default class ApplicantModel{

    constructor(applicantId, name, email, contact, resumePath) {
        this.applicantId = applicantId;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
    }

    static numberOfApplicants(){
        return applicants.length;;
    }

}

var applicants = [
    new ApplicantModel(
        1, 
        "John Doe", 
        "johndoe@example.com", 
        "123-456-7890", 
        "/resumes/johndoe.pdf"
    )
];