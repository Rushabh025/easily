export default class ApplicantModel{

    constructor(applicantId, name, email, contact, resumePath) {
        this.applicantId = applicantId;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
    }

    static numberOfApplicants(){
        return applicants.length;
    }

    static addApplicant(applicant){
        console.log(applicant);

        // Create a new ApplicantModel instance
        const newApplicant = new ApplicantModel(
            applicants.length + 1, // Auto-incrementing ID
            applicant.name,
            applicant.email,
            applicant.contact,
            applicant.resumePath
        );

        applicants.push(newApplicant);
        return newApplicant;
    }

}

let applicants = [
    new ApplicantModel(
        1, 
        "John Doe", 
        "johndoe@example.com", 
        "123-456-7890", 
        "/resumes/johndoe.pdf"
    )
];