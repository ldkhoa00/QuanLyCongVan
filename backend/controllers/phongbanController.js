const Phongban = require('../models/phongbans')

//Get All
const getAllPhongbans = async (req, res) => {
    try {
        const phongbans = await Phongban.find();
        res.json(phongbans);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Create 1
const createPhongban = async (req, res) => {
    const phongban = new Phongban({
        tenphongban: req.body.tenphongban,
        truongphong: req.body.truongphong,
        sdtphongban: req.body.sdtphongban
    })
    try {
        const newPhongban = await phongban.save();

        res.status(201).json(newPhongban);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update 1
const updatePhongban = async (req, res) => {
    const phongban = await Phongban.findById(req.params.id)
    try {
        if (phongban == null) {
            return res.status(404).json({ message: 'Không tìm thấy phòng ban' })
        }
        else {
            //Body nhận data truyền vào
            phongban.tenphongban = req.body.tenphongban
            phongban.truongphong = req.body.truongphong
            phongban.sdtphongban = req.body.sdtphongban
            const updatePhongban = await phongban.save()
            res.json(updatePhongban)
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Delete 1
const deletePhongban = async (req, res) => {
    const phongban = await Phongban.findById(req.params.id)
    try {
        if (phongban == null) {
            return res.status(404).json({ message: 'Không tìm thấy phòng ban' })
        }
        else {
            await phongban.deleteOne()
            res.json({ messasge: 'Xóa thành công' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getPhongbanById = async (req, res) => {
    try {
        const phongban = await Phongban.findById(req.params.id)
        if (phongban == null) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban" })
        }
        else {
            return res.json(phongban);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllPhongbans,
    getPhongbanById,
    createPhongban,
    deletePhongban,
    updatePhongban
};