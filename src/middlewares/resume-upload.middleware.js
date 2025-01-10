import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Resolve path relative to the root of the project
const uploadDir = path.join(process.cwd(), 'src', 'resumes'); // This resolves to 'F:/project/easily/src/resumes'

// Ensure the 'resumes' directory exists or create it if necessary
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure the directory exists
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Rename the file to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Max file size: 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        } else {
            cb(new Error('Invalid file type. Only PDF and Word documents are allowed.')); // Reject file
        }
    },
});

export default upload;
