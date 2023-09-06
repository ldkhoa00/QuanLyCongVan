const Congvan = require('../models/congvans')

//Get All
const getAllCongvans = async (req, res) => {
    try {
        const congvans = await Congvan.find();
        res.json(congvans);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}



//Create 1
const createCongvan = async (req, res) => {
    const congvan = new Congvan({
        kyhieucvan: req.body.kyhieucvan,
        ngaybanhanh: req.body.ngaybanhanh,
        ngayhethieuluc: req.body.ngayhethieuluc,
        nguoinhan: req.body.nguoinhan,
        trichyeu: req.body.trichyeu,
        noidung: req.body.noidung,
        trangthai: req.body.trangthai,
        ngaygui: req.body.ngaygui,
        file: req.body.file,
        loaicvan: req.body.loaicvan
    })
    try {
        const newCongvan = await congvan.save();

        await newCongvan.populate('loaicvan');

        res.status(201).json(newCongvan);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update 1
const updateCongvan = async (req, res) => {
    const congvan = await Congvan.findById(req.params.id)
    try {
        if (congvan == null) {
            return res.status(404).json({ message: 'Congvan not found' })
        }
        else {
            res.congvan.kyhieucvan = req.body.kyhieucvan
            res.congvan.ngaybanhanh = req.body.ngaybanhanh
            res.congvan.ngayhethieuluc = req.body.ngayhethieuluc
            res.congvan.nguoinhan = req.body.nguoinhan
            res.congvan.trichyeu = req.body.trichyeu
            res.congvan.noidung = req.body.noidung
            res.congvan.trangthai = req.body.trangthai
            res.congvan.ngaygui = req.body.ngaygui
            res.congvan.file = req.body.file
            const updateCongvan = await res.congvan.save()
            res.json(updateCongvan)
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Delete 1
const deleteCongvan = async (req, res) => {
    const congvan = await Congvan.findById(req.params.id)
    try {
        if (congvan == null) {
            return res.status(404).json({ message: 'Congvan not found' })
        }
        else {
            await res.congvan.deleteOne()
            res.json({ messasge: 'Delete successful' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getCongvanById = async (req, res) => {
    try {
        const congvan = await Congvan.findById(req.params.id)
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

module.exports = {
    getAllCongvans,
    getCongvanById,
    createCongvan,
    deleteCongvan,
    updateCongvan
};