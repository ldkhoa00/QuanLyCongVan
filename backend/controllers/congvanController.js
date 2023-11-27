const Congvan = require('../models/congvans')
const { mwUploadFile } = require('../middlewares/mwUploadFile');
const path = require('path');
const fs = require('fs');

//Get All
const getAllCongvans = async (req, res) => {
    try {
        const congvans = await Congvan.find().populate('loaicvan').populate('chudecvan').populate('phongban').populate('linhvuc');
        res.json(congvans);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Create 1
const createCongvan = async (req, res) => {
    console.log(req.body)
    const congvan = new Congvan({
        kyhieucvan: req.body.kyhieucvan,
        nguoinhan: req.body.nguoinhan,
        trichyeu: req.body.trichyeu,
        noidung: req.body.noidung,
        file: req.file.buffer,
        fileurl: `files/${req.file.filename}`,
        filename: req.file.originalname,
        trangthai: req.body.trangthai,
        ngaygui: req.body.ngaygui,
        coquanbanhanh: req.body.coquanbanhanh,
        noiluubanchinh: req.body.noiluubanchinh,
        loaicvan: req.body.loaicvan,
        chudecvan: req.body.chudecvan,
        phongban: req.body.phongban,
        linhvuc: req.body.linhvuc,
        kieucvan: req.body.kieucvan
    })
    try {
        const newCongvan = await congvan.save();

        await newCongvan.populate('loaicvan');

        res.status(201).json(newCongvan);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};


//Update 1
const updateCongvan = async (req, res) => {
    const congvan = await Congvan.findById(req.params.id);
    try {
        if (!congvan) {
            return res.status(404).json({ message: 'Congvan not found' });
        }

        // Cập nhật các trường chung
        congvan.kyhieucvan = req.body.kyhieucvan;
        congvan.nguoinhan = req.body.nguoinhan;
        congvan.trichyeu = req.body.trichyeu;
        congvan.noidung = req.body.noidung;
        congvan.trangthai = req.body.trangthai;
        congvan.ngaygui = req.body.ngaygui;
        congvan.coquanbanhanh = req.body.coquanbanhanh;
        congvan.noiluubanchinh = req.body.noiluubanchinh;
        congvan.loaicvan = req.body.loaicvan;
        congvan.chudecvan = req.body.chudecvan;
        congvan.linhvuc = req.body.linhvuc;
        congvan.kieucvan = req.body.kieucvan;

        //Tách chuỗi các ID thành mảng
        //do data req là "id1,id2,id3" => dùng split tách thành [id1,id2,id3]
        if (req.body.phongban) {
            congvan.phongban = req.body.phongban;
            const phongbanIds = req.body.phongban.split(',');
            congvan.phongban = phongbanIds;
        }
        else {
            congvan.phongban = [];
        }

        // Kiểm tra nếu có file mới được chọn
        if (req.file) {
            congvan.file = req.file.buffer;
            congvan.filename = req.file.originalname;
            congvan.fileurl = `files/${req.file.filename}`;
        }
        const updateCongvan = await congvan.save();
        res.json(updateCongvan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Delete 1
const deleteCongvan = async (req, res) => {
    const congvan = await Congvan.findById(req.params.id)
    try {
        if (congvan == null) {
            return res.status(404).json({ message: 'Congvan not found' })
        }
        else {
            await congvan.deleteOne()
            res.json({ messasge: 'Delete successful' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getCongvanById = async (req, res) => {
    try {
        const congvan = await Congvan.findById(req.params.id).populate('loaicvan').populate('chudecvan').populate('phongban').populate('linhvuc');
        if (congvan == null) {
            return res.status(404).json({ message: "Cannot find congvan" })
        }
        else {
            return res.json(congvan);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//DownFile
const getDownFileFromCongVan = async (req, res) => {
    try {
        const filename = req.params.filename;
        const folderPath = path.join(__dirname, '..', 'files/'); // '..' để trở về một cấp độ thư mục

        const filePath = path.join(folderPath, filename);

        // Kiểm tra xem file có tồn tại không
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }

        // Thiết lập header để trình duyệt hiểu rằng đây là file PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        // Đọc file và truyền nó vào response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

    } catch (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getAllCongvans,
    getCongvanById,
    createCongvan,
    deleteCongvan,
    updateCongvan,
    getDownFileFromCongVan
};