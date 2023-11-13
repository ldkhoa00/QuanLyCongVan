const mongoose = require('mongoose')

const linhvucSchema = new mongoose.Schema({
    tenlinhvuc: {
        type: String,
        required: true
    },
    kyhieu: {
        type: String,
        required: false
    },

})

//mongoose.model("tên model",schema)
module.exports = mongoose.model('Linhvuc', linhvucSchema);