require('dotenv').config()
const cors = require('cors')

//Sử dụng express library
const express = require('express')
//Sử dụng mongoose library
const mongoose = require('mongoose')
//Enable cors
const corsOptions = {
    origin: '*'
}

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

//event bắt lỗi khi đã connect database
db.on('error', (error) => console.error(error))

//khi đã kết nối 1 lần sẽ mở database
db.once('open', () => console.log('Connect to database'))

//CORS
app.use(cors(corsOptions));

//đọc file json
app.use(express.json())

//------------ROUTES-------------//
//lấy route congvan
const congvanRouter = require('./routes/congvanRoutes')
app.use('/congvans', congvanRouter) //thiết lập đường dẫn sử dụng

//lấy route loaicvan
const loaicvanRouter = require('./routes/loaicvanRoutes')
app.use('/loaicvans', loaicvanRouter) //thiết lập đường dẫn sử dụng

//lấy route phongban
const phongbanRouter = require('./routes/phongbanRoutes')
app.use('/phongbans', phongbanRouter) //thiết lập đường dẫn sử dụng

//lấy route linhvuc
const linhvucRouter = require('./routes/linhvucRoutes')
app.use('/linhvucs', linhvucRouter) //thiết lập đường dẫn sử dụng

//lấy route nhanvien
const nhanvienRouter = require('./routes/nhanvienRoutes')
app.use('/nhanviens', nhanvienRouter) //thiết lập đường dẫn sử dụng

//lấy route nhanvien
const userRouter = require('./routes/userRoutes')
app.use('/users', userRouter) //thiết lập đường dẫn sử dụng

//listen trên port 8000
app.listen(8000, () => console.log('Server started')) 