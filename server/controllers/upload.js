const multer = require("multer");
const path = require("path");

let uploadErrors = []
const {v4: uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname + '/../uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.usuario}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * Math.pow(1024, 2 /* MBs*/),
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            uploadErrors.push({ value: file.filename, msg: 'Only .png, .jpg, .jpeg, PDF, and CFR format allowed!' });
            cb(null, false);
        }
    }
}).array('files')

const uploadMiddleware = async (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("[ERROR UPLOAD MULTER] A Multer error occurred when uploading.")
            console.log(err)
        } else if (err) {
            console.log("[ERROR UPLOAD MULTER] An unknown error occurred when uploading.")
            console.log(err)
        }
        next();
    })
}

module.exports = {
    upload,
    uploadErrors,
    uploadMiddleware
}