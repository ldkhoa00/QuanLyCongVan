const User = require('../models/users')
const { registerValidator } = require('../validations/auth');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { error } = registerValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: req.body.email });

    if (checkEmailExist) return res.status(422).send('Email already existed');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
        user: req.body.user,
        phongban:req.body.phongban
    })

    try {
        const newUser = await user.save();
        await res.send(newUser);
    } catch (err) {
        res.status(400).send(err);
        return res.send(registerValidator(req.body))
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(422).send('Email or Password not correct');
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(422).send('Email or Password is not correct');
        }


        const token = jwt.sign({ _id: user._id, name: user.name, role: user.role, user: user.user }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 })

        if (res.headersSent) {
            console.error('Headers already sent. Cannot send additional headers.');
            return;
        }

        // Thiết lập tiêu đề và gửi phản hồi
        res.header('auth-token', token).send(token);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.find().populate('phongban');
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Delete 1
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    try {
        if (user == null) {
            return res.status(404).json({ message: 'Không tìm thấy phòng ban' })
        }
        else {
            await user.deleteOne()
            res.json({ messasge: 'Xóa thành công' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

//Get by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('phongban')
        if (user == null) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban" })
        }
        else {
            return res.json(user);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUserById,
    deleteUser
}