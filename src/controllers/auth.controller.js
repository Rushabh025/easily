import RecruitersModel from "../models/recruiters.model.js";

class AuthController {
    register(req, res, next) {
        // console.log('Body:', req.body);
        const { name, email, password } = req.body;

        try{
            // Validate and register the recruiter
            if (!name || !email || !password) {
                return res.status(400).redirect('/?error=Missing required fields');
            }

            // Check if recruiter already exists
            const existingRecruiter = RecruitersModel.findByEmail(email);
            if (existingRecruiter) {
                return res.status(400).redirect('/register?error=Email already registered');
            }

            RecruitersModel.addRecruiter(name, email, password);

            // Simulated registration success
            console.log('Recruiter registered:', { name, email });
            res.redirect('/?success=Registration successful');

        }catch(error){
            console.error('Error during registration:', error);
            return next(error);
        }
    }

    login(req, res, next) {
        // console.log('Body:', req.body);
        const { email, password } = req.body;

        // Find user by email
        const user = RecruitersModel.findByEmail(email);

        // Validate user credentials
        if (user && user.password === password) {
            req.session.user = { email: user.email, name : user.name };
            return res.redirect('/');
        }

        res.status(401).redirect('/?error=Invalid credentials');
    }

    logout(req, res, next) {
        req.session.destroy(err => {
            if (err) {
                console.error('Error logging out:', err);
                return res.status(500).redirect('/?error=Logout failed');
            }
            res.redirect('/');
        });
    }
}

export default AuthController;