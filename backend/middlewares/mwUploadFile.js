const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files') //determine the destination of file
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //cb nhận err, và tên file
    }
})

const upload = multer({ storage: storage })

const mwUploadFile = upload.single('file');

module.exports = {
    mwUploadFile
};