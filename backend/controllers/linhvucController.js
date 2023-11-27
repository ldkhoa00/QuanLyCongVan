const Linhvuc = require('../models/linhvucs')

//Get All
const getAllLinhvucs = async (req, res) => {
    try {
        const linhvucs = await Linhvuc.find();
        res.json(linhvucs);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Create 1
const createLinhvuc = async (req, res) => {
    const linhvuc = new Linhvuc({
        tenlinhvuc: req.body.tenlinhvuc,
        kyhieu: req.body.kyhieu
    })
    try {
        const newLinhvuc = await linhvuc.save();

        res.status(201).json(newLinhvuc);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//Update 1
const updateLinhvuc = async (req, res) => {
    const linhvuc = await Linhvuc.findById(req.params.id)
    try {
        if (linhvuc == null) {
            return res.status(404).json({ message: 'Không tìm thấy lĩnh vực' })
        }
        else {
            //Body nhận data truyền vào
            linhvuc.tenlinhvuc = req.body.tenlinhvuc
            linhvuc.kyhieu = req.body.kyhieu
            const updateLinhvuc = await linhvuc.save()
            res.json(updateLinhvuc)
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Delete 1
const deleteLinhvuc = async (req, res) => {
    const linhvuc = await Linhvuc.findById(req.params.id)
    try {
        if (linhvuc == null) {
            return res.status(404).json({ message: 'Không tìm thấy lĩnh vực' })
        }
        else {
            await linhvuc.deleteOne()
            res.json({ messasge: 'Xóa thành công' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getLinhvucById = async (req, res) => {
    try {
        const linhvuc = await Linhvuc.findById(req.params.id)
        if (linhvuc == null) {
            return res.status(404).json({ message: "Không tìm thấy lĩnh vực" })
        }
        else {
            return res.json(linhvuc);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllLinhvucs,
    getLinhvucById,
    createLinhvuc,
    deleteLinhvuc,
    updateLinhvuc
};