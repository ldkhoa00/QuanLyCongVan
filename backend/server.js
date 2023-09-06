require('dotenv').config()

//Sử dụng express library
const express = require('express')
//Sử dụng mongoose library
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

//event bắt lỗi khi đã connect database
db.on('error', (error) => console.error(error))

//khi đã kết nối 1 lần sẽ mở database
db.once('open', () => console.log('Connect to database'))

//đọc file json
app.use(express.json())

//lấy route
const congvanRouter = require('./routes/congvanRoutes')
app.use('/congvans',congvanRouter) //thiết lập đường dẫn sử dụng


//listen trên port 3000
app.listen(3000, () => console.log('Server started')) 