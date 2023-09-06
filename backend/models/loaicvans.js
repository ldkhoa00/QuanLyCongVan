const mongoose = require('mongoose')

const loaicvanSchema = new mongoose.Schema({
    tenloaicvan: {
        type: String,
        required: true
    },
    kyhieu: {
        type: String,
        required: true
    }

})

//mongoose.model("tên model",schema)
module.exports = mongoose.model('Loaicvan', loaicvanSchema);