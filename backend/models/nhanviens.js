const mongoose = require('mongoose')
const Phongban = require('./phongbans')

const nhanvienSchema = new mongoose.Schema({
    tennhanvien: {
        type: String,
        required: false
    },
    phongban: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phongban'
    },
    email: {
        type: String,
        required: false
    },
    ngayvaolam: {
        type: String,
        required: false,
    },
    sdtnhanvien: {
        type: String,
        required: false
    },
    diachi: {
        type: String,
        required: false
    }
})

//mongoose.model("tên model",schema)
module.exports = mongoose.model('Nhanvien', nhanvienSchema)