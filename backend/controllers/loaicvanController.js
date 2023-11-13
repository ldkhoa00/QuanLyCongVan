const Loaicvan = require('../models/loaicvans')

//Get All
const getAllLoaicvans = async (req, res) => {
    try {
        const loaicvans = await Loaicvan.find();
        res.json(loaicvans);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Create 1
const createLoaicvan = async (req, res) => {
    const loaicvan = new Loaicvan({
        tenloaicvan: req.body.tenloaicvan,
        kyhieu: req.body.kyhieu,
    })
    try {
        const newLoaicvan = await loaicvan.save();

        res.status(201).json(newLoaicvan);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update 1
const updateLoaicvan = async (req, res) => {
    const loaicvan = await Loaicvan.findById(req.params.id)
    try {
        if (loaicvan == null) {
            return res.status(404).json({ message: 'Loaicvan not found' })
        }
        else {
            loaicvan.tenloaicvan = req.body.tenloaicvan
            loaicvan.kyhieu = req.body.kyhieu
            const updateLoaicvan = await loaicvan.save()
            res.json(updateLoaicvan)
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Delete 1
const deleteLoaicvan = async (req, res) => {
    const loaicvan = await Loaicvan.findById(req.params.id)
    try {
        if (loaicvan == null) {
            return res.status(404).json({ message: 'Loaicvan not found' })
        }
        else {
            await loaicvan.deleteOne()
            res.json({ messasge: 'Delete successful' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getLoaicvanById = async (req, res) => {
    try {
        const loaicvan = await Loaicvan.findById(req.params.id)
        if (loaicvan == null) {
            return res.status(404).json({ message: "Cannot find loaicvan" })
        }
        else {
            return res.json(loaicvan);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllLoaicvans,
    getLoaicvanById,
    createLoaicvan,
    deleteLoaicvan,
    updateLoaicvan
};