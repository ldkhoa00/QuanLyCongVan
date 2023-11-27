const mongoose = require('mongoose')
const Loaicvan = require('./loaicvans')
const Phongban = require('./phongbans')
const Linhvuc = require('./linhvucs')

const congvanSchema = new mongoose.Schema({
    kyhieucvan: {
        type: String,
        required: false
    },
    nguoinhan: {
        type: String,
        required: false
    },
    trichyeu: {
        type: String,
        required: false
    },
    noidung: {
        type: String,
        required: false
    },
    trangthai: {
        type: Number,
        required: false
    },
    ngaygui: {
        type: String,
        required: false,
    },
    file: {
        type: Buffer,
        required: false
    },
    filename: {
        type: String,
        required: false
    },
    fileurl: {
        type: String,
        require: false
    },
    chudecvan: {
        type: String,
        required: false
    },
    coquanbanhanh: {
        type: String,
        required: false
    },
    noiluubanchinh: {
        type: String,
        required: false
    },
    kieucvan: {
        type: String,
        required: false
    },
    loaicvan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loaicvan'
    },
    phongban: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phongban'
    }],
    linhvuc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Linhvuc'
    },
})

//mongoose.model("tên model",schema)
module.exports = mongoose.model('Congvan', congvanSchema)