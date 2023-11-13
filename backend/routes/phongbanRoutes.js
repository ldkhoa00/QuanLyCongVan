const express = require('express');
const router = express.Router();
const phongbanController = require('../controllers/phongbanController')

router.get('/', phongbanController.getAllPhongbans);
router.get('/:id', phongbanController.getPhongbanById);
router.post('/', phongbanController.createPhongban);
router.patch('/:id', phongbanController.updatePhongban);
router.delete('/:id', phongbanController.deletePhongban);

module.exports = router;
