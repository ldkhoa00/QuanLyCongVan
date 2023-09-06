const mongoose = require('mongoose')
const Loaicvan = require('./loaicvans')

const congvanSchema = new mongoose.Schema({
    kyhieucvan: {
        type: String,
        required: false
    },
    ngaybanhanh: {
        type: Date,
        required: false,
        default: Date.now
    },
    ngayhethieuluc: {
        type: Date,
        required: false,
        default: Date.now
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
        type: Date,
        required: false,
        default: Date.now
    },
    file: {
        type: Buffer,
        required: false
    },
    loaicvan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Loaicvan'
    }
})

//mongoose.model("tên model",schema)
module.exports = mongoose.model('Congvan', congvanSchema)